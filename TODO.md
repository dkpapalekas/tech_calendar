Port components to render functions
   - **DONE** Addresses
   - **DONE** App
   - **DONE** Appliances
   - **DONE** Companies
   - **DONE** Customers
   - Job_Lines
      - **DONE** make Job_Lines API
      - **DONE** make EditJob_Line, ASK FOR JOB SELECT import, replace EditAddress everywhere
      - **DONE** getCRUD, ask vasilis about API/Jobs.ts withExtra
      - **DONE** createCRUD, updateCRUD,
   - **DONE** Jobs
   - **DONE** Login
   - **DONE** Materials
   - **DONE** Navbar
   - **DONE** Register
   - ~~Test~~ (not needed)

**WIP** All API calls in API provider
   - **DONE** Customers
   - **DONE** Companies
   - **WIP** Appliances
   - **DONE** Addresses
   - **DONE** Jobs
   - **WIP** JobLines
   - Materials

**WIP** Better authentication story
   - **DONE**With HTTP Basic Authentication
   - change Register to Change Email/Password form
   - alter user API endpoint

**DONE** Lint

**WIP** Calendar drag n drop

Simplify job entry

Remove bootstrap vue

Remove bootstrap

Vue3

Type checking

HTTPS

Change Jobs
   - add duration (small integer)
   - add file id foreign key

Add files
   - id primary key / name varchar
   - resize down to webp
   - add file posting, delition routes

Add file picker
   - upload file
   - select file
   - delete file

dpap Make remarks Optional

dpap clients
   - defaultsort by ID, desc
   - hide company field, remarks
   - add to **migrations** client source (site, partner(amoiridis), vrisko.gr, referal)

dpap jobs
   - appliance shown to grid

In every chain
   - **DONE** hold client id when accessing his addresses
   - hold address when accessing its jobs
