import { SUPABASE_KEY , SUPABASE_URL } from "./config";


//REPORTS_URL points to the fault_reports table through the Supabase REST API.
const REPORT_URL = `${SUPABASE_URL}/rest/v1/fault_report`

const HEADERS = {
    apikey : SUPABASE ,
    Authorization: `Bearer ${SUPABASE_KEY}` , 
    "Content-Type": "application/json"
};

//GET: Retrive report from Supabase