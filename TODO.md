- add new job with empty date

**WIP** Better authentication story
   - [DONE] With HTTP Basic Authentication
   - change Register to Change Email/Password form
   - alter user API endpoint
   - dpap DOMAIN NAME (akis.fridgital.tk)
   - HTTPS

[WIP] Calendar drag n drop
   - [DONE] Calendar: See job customer_surname, address, appliance on hover
   - [DONE] optional: Start from the current day, not from january first

dpap Make remarks Optional
dpap clients
   - defaultsort by ID, desc
   - hide company field, remarks
   - add to **migrations** client source (site, partner(amoiridis), vrisko.gr, referal)

dpap In every chain
   - [DONE] hold client id when accessing his addresses
   - [DONE] hold address when accessing its jobs
Port components to render functions
   - [DONE] Addresses
   - [DONE] App
   - [DONE] Appliances
   - [DONE] Companies
   - [DONE] Customers
   - [DONE] Job_Lines
      - [DONE] make Job_Lines API
      - [DONE] make EditJob_Line, ASK FOR JOB SELECT import, replace EditAddress everywhere
      - [DONE] getCRUD, ask vasilis about API/Jobs.ts withExtra
      - [DONE] createCRUD, updateCRUD,
   - [DONE] Jobs
   - [DONE] Login
   - [DONE] Materials
   - [DONE] Navbar
   - [DONE] Register
   - [WONTFIX] ~~Test~~ (not needed)

[DONE]All API calls in API provider
   - [DONE] Customers
   - [DONE] Companies
   - [DONE] Appliances
   - [DONE] Addresses
   - [DONE] Jobs
   - [DONE] JobLines
   - [DONE] Materials


[DONE] Lint

[DONE] Change Jobs
   - [DONE] add duration (small integer)
