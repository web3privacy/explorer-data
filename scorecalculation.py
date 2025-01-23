import os
import yaml
import csv
from pathlib import Path

# Embedded ranking system
RANKING_CRITERIA = [
    {
        'id': 'openess',
        'name': 'Openess',
        'references': [
            {
                'field': 'team.teammembers',
                'label': {'name': 'Team', 'positive': 'Member', 'negative': 'Anonymous'},
                'condition': {'minLength': 1},
                'points': 10
            },
            {
                'field': 'links.docs',
                'label': {'name': 'Documentation', 'positive': 'Link', 'negative': 'Not available'},
                'condition': {'exists': True},
                'points': 10
            },
            {
                'field': 'links.github',
                'label': {'name': 'Github', 'positive': 'Link', 'negative': 'Not available'},
                'condition': {'exists': True},
                'points': 10
            },
            {
                'field': 'links.twitter',
                'label': {'name': 'Twitter', 'positive': 'Link', 'negative': 'Not available'},
                'condition': {'exists': True},
                'points': 1
            },
            {
                'field': 'links.telegram',
                'label': {'name': 'Telegram', 'positive': 'Link', 'negative': 'Not available'},
                'condition': {'exists': True},
                'points': 1
            },
            {
                'field': 'links.discord',
                'label': {'name': 'Discord', 'positive': 'Link', 'negative': 'Not available'},
                'condition': {'exists': True},
                'points': 1
            },
            {
                'field': 'links.lens',
                'label': {'name': 'Lens', 'positive': 'Link', 'negative': 'Not available'},
                'condition': {'exists': True},
                'points': 1
            },
            {
                'field': 'links.farcaster',
                'label': {'name': 'Farcaster', 'positive': 'Link', 'negative': 'Not available'},
                'condition': {'exists': True},
                'points': 1
            },
            {
                'field': 'links.whitepaper',
                'label': {'name': 'Whitepaper', 'positive': 'Link', 'negative': 'Not available'},
                'condition': {'exists': True},
                'points': 10
            },
            {
                'field': 'funding',
                'label': {'name': 'Funding', 'positive': 'Investment', 'negative': 'Not available'},
                'condition': {'minLength': 1},
                'points': 10
            }
        ]
    },
    {
        'id': 'technology',
        'name': 'Technology',
        'references': [
            {
                'field': 'project_status.mainnet',
                'label': {'name': 'Mainnet', 'positive': 'Yes', 'negative': 'No'},
                'condition': {'equals': True},
                'points': 10
            },
            {
                'field': 'blockchain_features.opensource',
                'label': {'name': 'Open Source', 'positive': 'Yes', 'negative': 'No'},
                'condition': {'equals': True},
                'points': 20
            },
            {
                'field': 'blockchain_features.asset_custody_type',
                'label': {'name': 'Non Custody', 'positive': 'None', 'negative': 'Custodial'},
                'condition': {'equals': 'non-custody'},
                'points': 10
            },
            {
                'field': 'blockchain_features.upgradability.enabled',
                'label': {'name': 'Upgradability', 'positive': 'Disabled', 'negative': 'Enabled'},
                'condition': {'equals': False},
                'points': 10
            },
            {
                'field': 'audits',
                'label': {'name': 'Audits', 'positive': 'Audit', 'negative': 'None'},
                'condition': {'minLength': 1},
                'points': 10
            }
        ]
    },
    {
        'id': 'privacy',
        'name': 'Privacy',
        'references': [
            {
                'field': 'privacy_policy.link',
                'label': {'name': 'Privacy Policy', 'positive': 'Link', 'negative': 'Not available'},
                'condition': {'exists': True},
                'points': 10
            },
            {
                'field': 'tracebility.kyc',
                'label': {'name': 'KYC', 'positive': 'No', 'negative': 'Yes'},
                'condition': {'equals': False},
                'points': 10
            },
            {
                'field': 'compliance',
                'label': {'name': 'Compliance', 'positive': '...', 'negative': 'No'},
                'condition': {'exists': True},
                'points': 5
            },
            {
                'field': 'default_privacy',
                'label': {'name': 'Default Privacy', 'positive': 'YES', 'negative': 'No'},
                'condition': {'equals': True},
                'points': 10
            }
        ]
    }
]

def load_yaml_file(file_path):
    """Load and parse a YAML file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            return yaml.safe_load(f)
        except yaml.YAMLError as e:
            print(f"Error parsing {file_path}: {e}")
            return None

def get_field_value(data, field_path):
    """Get a value from nested dictionary using dot notation field path."""
    try:
        value = data
        for key in field_path.split('.'):
            if value is None:
                return None
            value = value.get(key)
        return value
    except (KeyError, AttributeError):
        return None

def evaluate_condition(value, condition):
    """Evaluate if a value meets the specified condition."""
    if value is None:
        return False
    
    if 'exists' in condition:
        return bool(value) if condition['exists'] else not bool(value)
    
    if 'equals' in condition:
        return value == condition['equals']
    
    if 'minLength' in condition:
        if isinstance(value, (list, dict)):
            return len(value) >= condition['minLength']
        return False
    
    return False

def calculate_project_score(project_data, debug=False):
    """Calculate the score for a single project based on ranking criteria."""
    total_score = 0
    score_breakdown = {}
    
    if debug:
        print("\nCalculating maximum possible score:")
        max_score = sum(
            sum(ref['points'] for ref in category['references'])
            for category in RANKING_CRITERIA
        )
        print(f"Maximum possible score: {max_score}")
    
    for category in RANKING_CRITERIA:
        category_score = 0
        category_id = category['id']
        score_breakdown[category_id] = []
        
        if debug:
            print(f"\nScoring category: {category_id}")
            category_max = sum(ref['points'] for ref in category['references'])
            print(f"Maximum possible points for {category_id}: {category_max}")
        
        for ref in category['references']:
            field_value = get_field_value(project_data, ref['field'])
            points = ref['points']
            
            meets_condition = evaluate_condition(field_value, ref['condition'])
            
            if meets_condition:
                category_score += points
                status = 'positive'
            else:
                status = 'negative'
            
            if debug:
                print(f"\nField: {ref['field']}")
                print(f"Value: {field_value}")
                print(f"Condition: {ref['condition']}")
                print(f"Points: {points if meets_condition else 0}")
                print(f"Status: {status}")
            
            score_breakdown[category_id].append({
                'field': ref['field'],
                'points': points if meets_condition else 0,
                'status': status,
                'value': field_value
            })
        
        total_score += category_score
        if debug:
            print(f"{category_id} total score: {category_score}")
    
    if debug:
        print(f"\nFinal total score: {total_score}")
    
    return total_score, score_breakdown

def export_to_csv(project_scores, output_file):
    """Export project scores to CSV file with detailed breakdown."""
    # Calculate maximum possible scores per category
    max_scores = {}
    for category in RANKING_CRITERIA:
        max_scores[category['id']] = sum(ref['points'] for ref in category['references'])
    
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        
        # Write header
        header = ['Project', 'Total Score', 'Percentage']
        for category in RANKING_CRITERIA:
            header.append(f"{category['name']} Score")
            header.append(f"{category['name']} %")
        writer.writerow(header)
        
        # Write project scores
        total_possible = sum(max_scores.values())
        for project in project_scores:
            row = [
                project['name'],
                project['score'],
                f"{(project['score'] / total_possible * 100):.1f}%"
            ]
            
            # Add category breakdowns
            for category in RANKING_CRITERIA:
                category_score = sum(item['points'] for item in project['breakdown'][category['id']])
                category_max = max_scores[category['id']]
                row.append(category_score)
                row.append(f"{(category_score / category_max * 100):.1f}%")
            
            writer.writerow(row)

def process_projects(projects_dir, debug=False):
    """Process all projects and generate rankings."""
    project_scores = []
    
    # Calculate maximum possible score
    max_possible = sum(
        sum(ref['points'] for ref in category['references'])
        for category in RANKING_CRITERIA
    )
    
    if debug:
        print(f"Maximum possible score: {max_possible}")
    
    # Process each project
    for project_dir in Path(projects_dir).iterdir():
        if project_dir.is_dir():
            index_file = project_dir / 'index.yaml'
            if index_file.exists():
                if debug:
                    print(f"\nProcessing project: {project_dir.name}")
                
                project_data = load_yaml_file(index_file)
                if project_data:
                    score, breakdown = calculate_project_score(project_data, debug)
                    project_scores.append({
                        'name': project_dir.name,
                        'score': score,
                        'breakdown': breakdown
                    })

    # Sort projects by score (low to high)
    project_scores.sort(key=lambda x: x['score'])
    
    return project_scores

def main():
    # Configuration
    projects_directory = "./src/projects" # Update this path
    output_file = "project_rankings.csv"
    
    # Enable debug mode to see detailed scoring process
    debug_mode = True
    
    # Process projects and generate rankings
    project_scores = process_projects(projects_directory, debug_mode)
    
    if project_scores:
        # Export results to CSV
        export_to_csv(project_scores, output_file)
        print(f"\nRankings have been exported to {output_file}")
        
        # Print summary
        print("\nTop 5 Projects:")
        for project in project_scores[-5:]:
            print(f"{project['name']}: {project['score']} points")
        
        # Print maximum possible score
        max_score = sum(
            sum(ref['points'] for ref in category['references'])
            for category in RANKING_CRITERIA
        )
        print(f"\nMaximum possible score: {max_score}")

if __name__ == "__main__":
    main()