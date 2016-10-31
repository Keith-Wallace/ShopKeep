#ShopKeep JavaScript Code Challenge
ShopKeep has been talking to business owners who wish to keep track of their Stock Items.
These business owners note that, for each Stock Item, they would need to have the following
information:
- **Name:** The name of the Stock Item to be added
- **Description:** A description of the Stock Item
- **Price:** How much the customer pays for the Stock Item
- **Available Date:** When this Stock Item is available within the store. The business owner can set
this value to be in the future if need be
- **Taxable:** Whether or not the Stock Item has tax applied when purchased

## Application Scenarios
The business owners detailed the following scenarios they would need to perform:

Scenario 1:
```
As a Business Owner
I want to be able to view my existing Stock Items
So that I can see what Stock Items my shop stocks
```

Scenario 2:
```
As a Business Owner
I want to be able to add a new Stock Item
So that I can keep track of additional Stock Items as they are added to my store
```

As an engineer, you have been tasked to write a frontend to implement the scenarios detailed
above. Your implementation should be extensible and allow us, in the future, to persist and
hydrate the application data from a remote server - that server interaction is not required for this
solution.

In order to gain an insight into the decisions you have made whilst developing this application,
please also make note of any assumptions and choices made. Is your solution scalable?
Maintainable? Are there potential pain points? Is it architecturally sound?

Though at ShopKeep we use React in our front-end development, please feel free to use any
available open-source frameworks and libraries, as required.

## Notes from the Developer
The Tech Stack for this application:
- Front-End: React.js, HTML, and CSS
- Server Side: Node.js with Express.js and Axios
- Data: JSON file
- Plugins/Dependencies: Webpack for bundling JS files (front-end), Babel for transpiling any ES6 => ES2015

I wanted to try to keep this application lightweight and as few "moving parts" as possible, mainly so it can be maintained more easily and with fewer areas for any bugs to exist in the code.

For the front-end I used three components: Main.js (entry point of the application), Dashboard.js (set data from JSON file to the state and pass it down to the next component), and StockItem.js (Display each stock item from Dashboard.js). Setting up the flow of the props data can allow any additional components to be added below the Dashboard view. It also helps with maintaining the front-end as each task is split up into its own module (or component), which also makes the application to be scalable for any future features.

There are three API calls: Getting the data and rendering it to the page (/getStockData), inserting a record to the data file when adding a new stock item (/addStockItem), and updating an existing record when the availability date has been modified (/updateItem).

**Assumptions:** I assumed that the end user wanted to be able to adjust the availability date at any time, so I added this feature when you view all items in stock. A suggested future feature might include the ability to edit all the fields in the record.

My takeaways/pain points:
- Separate component for date drop-down menus: It is repeated twice in the Dashboard and StockItem view, rather than being modular because of time constraints.
- Separate API routes into separate files: No need to keep it in the server.js file. Plus I could have called the same API (Read JSON data) function, rather than repeat the same code.
- How I displayed the "Add Item" form: Wanted to maintain the single-page app feel, rather than redirecting to two pages.  Felt the layout could be improved. Originally had it display at the bottom but was a concern if there were 100+ items and it would fall well below the view.
- Edit/Done Button: Struggle at first on how the final functionality would work, but happy with the results.
- Date drop-down: Number of days available in the date drop-down does not accurately reflect the days in the selected month, due to time constraints.

## Run Application
You can view a running application on [Heroku](https://shop-keep.herokuapp.com/).

~ or ~

If you want to run this application on your local machine, fork this repo to your local repo and clone:
```
$ git clone https://github.com/[github-username]/ShopKeep.git
```
Install dependencies:
```
$ npm install
```
Run node.js server:
```
$ npm run start
```
Open in browser from localhost
