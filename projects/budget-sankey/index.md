---
"body-class": projects
layout: page
title: Candidates Questionnaire Project Profile
---

## RI Budget Sankey Project Profile

**STATUS: Launched as beta**

### Summary

This application, written in JavaScript, shows how the nearly $10 billion Rhode Island state budget flows from revenue source to appropriation fund to governmental department. Anticipated users include lawmakers and government agency managers, journalist and civic activists and program beneficiaries. The current beta version represents a first step toward a comprehensive application that will track expenditures at the checkbook level.

### Contributors

Project Leads: [James Haley](https://github.com/jamesrhaley) and [Nelson Rocha](https://github.com/nelsonri72)

Other Major Contributors: [Thom Guertin](https://github.com/thomguertin), [Joe Alba](https://github.com/joealba), Brian Daniels

![RI Budget Sankey image](/images/photos/RI_Budget_Sankey1.JPG)

### Source Data

Thom Guertin, RI's Chief Digital Officer and head of the Office of Digital Excellence provided the initial dataset. Brian Daniels, Director in Performance Management in the Office of Management and Budget then provided the technical appendix and context. Together, they were able to deliver the key data required: 

* Revenue by source
* Source allocations to appropriation funds
* Fund allocations to government department 

Nelson Rocha took these data as a Microsoft Access database and merged the tables via Google Fusion. Next, he developed queries and filters to download the data as comma separated values (CSV), which he delivered to James Haley, the primary developer.

James then converted the text to title case and then converted the CSV file to JSON, which would be readable by the JavaScript used to generate the sankey diagram.

### Application Development

The visualization adapted the [D3 sankey javascript plugin](https://github.com/d3/d3-plugins/tree/master/sankey). James' greatest challenge was developing a working tooltip (cursor) that would highlight all incomes and/or outflows from any given object in the diagram, be it revenue source, fund or agency. The D3 tooltip would only highlight a single flow between two objects.

His second major challenge was to develop methods to display text, such as dollar amounts and percentage of budget, as well as the names of the revenues, funds and agencies. These displays needed to be easily read by users without obscuring the already crowded diagram.

Finally, James rewrote a portion of the D3 plugin, allowing it to sort and display data by scale with the largest amounts on top and the smallest at the bottom.

The beta version released in February 2015 represent a first step in an ongoing process of enhancement. Planned iterations seek to include greater detail, particularly on the spending side of the diagram. Beyond agency or department, Code Island would like to see the application include functions, programs and individual expenditures at the checkbook level. On the income side, we would like to include detail on the specific sources of revenue (personal income, business tax, specific fees, etc.).

Planned user enhancements include the ability to filter columns, access budget data from at least five previous years as well as proposed or forecasted budgets and then compare budgets across years. Ultimately, this application would allow users to modify the budget figures to produce their own version. We believe such a tool would be of great value to lawmakers as they work to create the state's annual spending plan.

More is planned in later iterations that may include a.) Function, b.)Program, c.) Expenditures to the right side and d.)Tax Revenue detail on the left most side..  Further enhancements to be considered include e.) user ability to filter columns, g.)user  option by year including proposed/forecasted budgets,  g.) animation through all the years  h.) a participatory simulation feature that may allow users to modify values locally to propose/generate their own version of the budget.  

**Related Project: RI Budget as an Area Chart** Currently in development, this multi-year timeline area chart will show changes over time by category of budget (revenue source, fund, agency, function, program, and expenditure, displaying the dollar amounts and trends of the budget over time.