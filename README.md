# BugRid

## Introduction

Here at Sheetgo, we started using a Spreadsheet to keep track of our bugs in order to efficiently fix them. After some time, we noticed that the Bug Spreadsheet started to grow in complexity thus presenting us as the challenge: How can we create a solution that has well defined rules and an efficient flow of notification across all this process?

In order to achieve this, we combined the power of sheetgo background with spreadsheets with what we priviously had in bug tracking controll, to create a new template.

## How to Configure Your Bugbuster solution

[Create a copy](https://docs.google.com/spreadsheets/d/1EUt_ackq0m47wE2t4g-SNdxfDIJd5Rk9KisbXL2qj4o/copy) of the Google Sheet by clicking on the link and clicking “Make a Copy” that will be used as the central database for bug submissions. It includes the following tabs:

1. Dashboard: Statistics around your bug tracking process
2. Bugs: Central database of all reported bugs
3. Input Developers: Where you assign names and emails to your developers.

Ignore all hidden tabs (only for advanced users who want to modify their solution). If you want to manipulate those, please contact [support@sheetgo.com](mailto://support@sheetgo.com).

## Step 2: Input Developers

On the tab Input Developers, add your developer team. You can have up to 10 developers in your team. Provide an email and name for each of them. Consequently, every developer has his/her own custom filter view to work on only his/her bugs on the Bugs tab. They can even bookmark their filter view URL to directly access only their bugs.

![Input Developers](https://blog.sheetgo.com/wp-content/uploads/2018/09/Screenshot_2018-09-28_17-38-21.png)

## Step 3: Bugs tab

On the bugs tab, only edit the white columns G:J. Grey columns are not meant to be edited. For every new bug on this tab, fill in columns G:J to assign it to a developer. Developers in turn only need to work on the columns K:N.

**Remember**: As the one assigning bugs, don’t be in any custom filter view!

![Bugs Tab](https://blog.sheetgo.com/wp-content/uploads/2018/09/Screenshot_2018-09-28_17-41-18.png)

## Step 4: Google Form

At step 1, you created a copy of the Google Sheet which also created a copy of the Google Form that is used by the user support team to submit new bugs. Now, go to the menu Form > Edit form and open the Google Form that had been created automatically. If you are prompted to restore the folder that is used to hold uploaded screenshots or videos, press Restore. Every new bug submitted using this Google Form will be added as a new row to your Google Sheet on the tab Bugs.

To submit your first bug, click on the Preview icon to open the form in preview mode. You can send this link to your support team, for them to submit new bugs.

![Google Form](https://blog.sheetgo.com/wp-content/uploads/2018/09/Screenshot_2018-09-28_17-41-53.png)

## Step 5: Installing the Google Emailing Script

Let us now focus on the last integral part of this bug tracking system: the email component. The idea is that as soon as the developer has fixed a bug and requires testing feedback from the support member, he/she can check column L on the Bugs tab. Once this column has been checked for a bug, a script sends an automatic email to the support member (column C) to test and give feedback by replying to the email.

This is an iterative process. As soon as the bug has been fixed, sufficiently tested, and finally released, the developer can check column N to send a final confirmation email to the user who had experienced the bug.

To set up this emailing script, on the Google Sheet, select Tools from the menu and then Script Editor. Click on the icon for current project triggers.

![Google Apps Script](https://blog.sheetgo.com/wp-content/uploads/2018/09/Screenshot_2018-09-28_17-42-35.png)

Set up your project trigger as shown in the below screenshot:

![Set up Trigger](https://blog.sheetgo.com/wp-content/uploads/2018/09/Screenshot_2018-09-28_17-43-01.png)

Congratulations!

You have just set up your own bug tracking ticketing system. Now, have one of your user support people submit a new bug using the Google Form and let your developers play with killing the bugs. 🙂