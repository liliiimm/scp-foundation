/* =========================================
   SCP FOUNDATION // SUPABASE CONNECTION
========================================= */

const SUPABASE_URL = "https://fplfphcgggcipizwoykm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1X1I9KRQ9V3giF2Fcev9Cg_C2adKigf";

if (!window.supabase || !window.supabase.createClient) {
    console.error("SUPABASE LIBRARY NOT LOADED");
} else {
    window.supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );

    console.log("SCP FOUNDATION // SUPABASE CONNECTED");
}