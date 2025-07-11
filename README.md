

## Getting Started

First, install all dependencies and setup prisma for the DB. Simply open the terminal and run the following commands.

### Recommended setup:
```bash
npm run setup
```


### OR if the top command didn't work
```bash
npm run dev
npx prisma generate
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Setting up Environment Variables

Environment variables are like secret keys and passwords we want to create and keep hidden to ensure no one else besides the developers can utilise them. 


To start, head to the secret Google Drive and download the .env file there. Then paste in the .env file directly in the **main** folder (where your src, public, etc are).

OR 

just create your .env file there and paste in the DB key

(please message me if you need help on this step)


## Setting up the PostgreSQL using Prisma
This should already be setup using the setup commands above, but if you come across any issues (such as migrations), please let me know and I will configure the setup scripts. 

To access the database, I have connected it to Supabase for its super friendly interface. Simply sign up on [https://supabase.com](https://supabase.com/) and let me know the email you used to sign up. We will focus mostly on the table editor for now.

If you also would like to create your own models (like the example models existing in the ./prisma/schema.prisma), then you can simply define a new model in there, and run the command:

```bash
npx prisma migrate dev --name <your_migration_name>
```
for example
```bash
npx prisma migrate dev --name my_first_migration
```
### CSS Component Library (Shadcn)

I've set up most of the Shadcn configurationss already, so all that really needs to be done is to install the components and use them in the design. Shadcn builds upon tailwindCSS and RadixUI, so the way to customise the design of the components is simply just to change/add the className=" " (please refer to /src/app/vendors/AddUserForm.tsx for examples of how that looks like)

```bash
npx shadcn@latest add <component-name>

// For example, to add a button component:
npx shadcn@latest add button
```
Please check this for ALL the components available:
[https://ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)


### Where to start?

If you are familiar with Github, I would recommend creating a new branch by heading to Branch -> Create Branch. This way the work you do will be separate to what is currently in the **master** branch, and when you have completed a task or are happy with progress, you can create a 'Pull Request'. This avoids conflicts between multiple members trying to work on the same branch and causing many merge conflicts when trying to push their progress at the same time.

In Next.js, all routes are defined by their folder structures, which is super convenient. That way you can create folders and create a **'page.tsx'** file in there, where app is the base path.  For example, the /src/app/dashboard/page.tsx means that the page will be rendered at [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

Feel free to get familiar with some simple Shadcn components and styling, and what each property of the styling really does. You can also see in 'src/app/vendors/actions.ts' how I have defined DB requests as functions. At each route/page folder, you can create an 'actions.ts' file to define your queries there, where you can also visit the **Supabase** website to see your DB too!
