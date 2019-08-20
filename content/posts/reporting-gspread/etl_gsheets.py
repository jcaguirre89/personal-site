# etl_gsheets.py
import gspread_utils
import data_processing

def main():
    """ gets clean data and dumps into google sheets """
	
    # Get data    
    df = data_processing.etl()

    # Send to Google sheets
    client = gspread_utils.get_client(creds_file='google_secrets.json')
    sheet = client.open('MyData')
    gspread_utils.paste_csv(df.to_csv(index=False),
                            sheet,
                            tab_name='Sheet1',
                            starting_cell='A1')
    
if __name__ == '__main__':
    print('Starting..')
    main()
    print('All done!')