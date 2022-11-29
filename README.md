# Development

### Link to Deployed Website
If you used the stencil code, this is `https://<your GitHub username>.github.io/<name of your repository>`

### Goal and Value of the Application
The goal of this application is to provide a web interface for a record store: Empire Records. With this site, users can shop for available records at Empire and filter/sort them by various categories for a more advanced search process.

### Usability Principles Considered
I made sure to use bolded text/larger font sizes for sort/filter/cart for ease in readability; I made the side section with sort/filter/cart obviously different from the item cards themselves by making the section a high-contrast color to the rest of the site for ease of navigation/learnability; I also made sure to include alt text for all images in item cards for accessibility/usability. 

### Organization of Components
I have 3 main components: Filter, Sort, and Vinyl. Filter is the component that defines filtering sections (Genre, Decade) and applies the filtering functionality; Sort is the component that defines the sorting section and applies the selected sort method to the items (Vinyls); Vinyl is the component that defines a Vinyl item and creates/displays an item card.

### How Data is Passed Down Through Components
- Vinyl takes in a bunch of props from App.js, mostly being informational fields from the assets/vinyl-data.json file, but also the state/state setters for the shopping cart and its total price. Vinyl uses the informational fields from the json to create a card display with all the information needed to represent an item, as well as a button that updates to add the item to the cart or remove the item from the cart depending on whether the item is in the cart.
- Sort only takes the sortRecords() function from App.js, which it uses to apply the selected sort method (either by price or popularity, popularity being the default selected method) to the Vinyl items to change the display. 
- Filter takes a filterGroup prop, which represents an object defined in the filterGroups array in App.js. Filter also takes the type of filter being applied (for the purpose of not wanting to write group.type a bunch of times), as well as the filterRecords() function defined in App.js. Filter uses these props to display the filtering categories on the side bar, as well as apply the filterRecords() function when a filter is checked. filterRecords() in App.js just applies the selected filters to the Vinyl items to display the Vinyls where all filters are true.

### How the User Triggers State Changes
- When a user clicks an 'Add to Cart' button on a Vinyl card, the state of **totalPrice** (App.js) is updated with the price of the Vinyl added to the current state price; the **cart** array (App.js) is updated with the album name added to the current cart to display the items in cart; the 'Add to Cart' button becomes a 'Remove from Cart' button once the add button is clicked; the 'Remove from Cart' button will subtract the item price from **totalPrice** and remove the item from the **cart** array.
- When a user clicks a different radio button under the 'Sort By' section, the state of the **info** array (App.js), which is a copy of vinylData (json data, App.js), is updated by the sortRecords() function, in that **info** is sorted by lowest to highest given a specific sorting option (either price or popularity, both numerical values).
- When a user picks a filter or filters under the 'Filter By' section, the state of **info** (App.js) is updated to only include vinyls that abide by the chosen filters via the applyFilters() function. The state of the **appliedFilters** array (App.js) is also modified by the filterRecords() function, as a filter will be pushed or removed from the array if the user checks or unchecks it (respectively). Choosing a filter also updates the state of **sorter** (App.js), a string representing the currently sorted type, as I had to directly sort vinylData since I also had to filter vinylData directly to change the state of **info**, and I used **sorter** as an argument to the jankSort() method to sort vinylData on the type provided by **sorter**. This helps to ensure that the filtered data is still sorted by the active radio button in the 'Sort By' section.
