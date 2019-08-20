# gspread_utils.py
import gspread
from oauth2client.service_account import ServiceAccountCredentials


def get_client(creds_file='google_secrets.json'):
    """
    use creds to create a client to interact with the Google Drive API
    :param creds_file: 'clients_json
    :return: gspread Client object
    """
    scope = ['https://spreadsheets.google.com/feeds' + ' ' +'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name(creds_file, scope)
    client = gspread.authorize(creds)
    return client

def get_last_row(tab):
    """ Helper function to find last row with data """
    last = tab.row_count
    if last < 1:
        return 1
    return last

def get_last_col(tab):
    """ Helper function to find last col with data """
    last = tab.col_count
    if last < 1:
        return 1
    return last

def clear_contents(tab):
    """ Delete all data in a given tab (must be a gspread sheet object) """
    last_row = get_last_row(tab)
    last_col = get_last_col(tab)
    range_of_cells = tab.range(1, 1, last_row, last_col)
    for cell in range_of_cells:
        cell.value = ''
    tab.update_cells(range_of_cells)

def paste_csv(csv_data, sheet, tab_name='Sheet1', starting_cell='A1'):
    '''
    Deletes content in sheet (if exists) and pastes csv data
    csv_data - csv string
    sheet - a gspread.Spreadsheet object
    cell - string giving starting cell
    '''
    # If the tab doesn't exist, create it
    try:
        tab = sheet.worksheet(tab_name)
    except:
        tab = sheet.add_worksheet(title=tab_name, rows="20", cols="5")

    clear_contents(tab)
    (first_row, first_column) = gspread.utils.a1_to_rowcol(starting_cell)

    body = {
        'requests': [{
            'pasteData': {
                "coordinate": {
                    "sheetId": tab.id,
                    "rowIndex": first_row-1,
                    "columnIndex": first_column-1,
                },
                "data": csv_data,
                "type": 'PASTE_NORMAL',
                "delimiter": ',',
            }
        }]
    }
    return sheet.batch_update(body)