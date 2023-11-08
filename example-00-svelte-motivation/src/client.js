// "data" variable is coming from the other JS file
// console.log(data);

/**
 * Loops through all customer data and adds a row to the table for each customer.
 */
function displayCustomerData() {
    // Get the table body where to insert the data
    const tbody = document.querySelector("#customer-table-body");

    // Loop thru our array
    data.forEach((customer) => {
        tbody.appendChild(createCustomerRow(customer));
    });
}

/**
 * Creates a row representing a single customer.
 */
function createCustomerRow(customer) {
    // For each one, add a table row
    const tr = document.createElement("tr");

    // Need some way of referring back to this row later so we can change its values...
    tr.dataset.customerid = customer.id;

    // Set data
    tr.innerHTML = `
        <td>${customer.id}</td>
        <td>${customer.firstName}</td>
        <td>${customer.lastName}</td>
        <td>${customer.email}</td>
        <td>${customer.gender}</td>
        <td><input type="number" value=${customer.loyaltyPoints}></td>
        <td>${customer.loyaltyCategory}</td>`;

    // Grab the input we just created, add an event handler to its onChange event
    const input = tr.querySelector("input");
    input.addEventListener("input", (e) =>
        editCustomerLoyalty(customer, parseInt(e.target.value))
    );

    return tr;
}

function editCustomerLoyalty(customer, newLoyalty) {
    // Find the table row to edit
    const tbody = document.querySelector("#customer-table-body");
    const tr = tbody.querySelector(`tr[data-customerid="${customer.id}"]`);

    // Calculate the new loyalty category; save the data to the customer
    let newLoyaltyCategory = "Bronze";
    if (newLoyalty >= 1000) newLoyaltyCategory = "Gold";
    else if (newLoyalty >= 250) newLoyaltyCategory = "Silver";
    customer.loyaltyPoints = newLoyalty;
    customer.loyaltyCategory = newLoyaltyCategory;

    // Update customer loyalty category in table
    tr.querySelector("td:last-child").innerHTML = customer.loyaltyCategory;

    // Update summary stats
    displaySummaryStats();
}

/**
 * Calculates and displays summary statistics.
 */
function displaySummaryStats() {
    // Calculate statistics
    const totalCustomers = data.length;
    let bronzeCustomers = 0;
    let silverCustomers = 0;
    let goldCustomers = 0;

    data.forEach((customer) => {
        if (customer.loyaltyCategory === "Bronze") bronzeCustomers++;
        if (customer.loyaltyCategory === "Silver") silverCustomers++;
        if (customer.loyaltyCategory === "Gold") goldCustomers++;
    });

    // Display statistics
    document.querySelector("#total-customers").innerHTML = totalCustomers;
    document.querySelector("#bronze-customers").innerHTML = bronzeCustomers;
    document.querySelector("#silver-customers").innerHTML = silverCustomers;
    document.querySelector("#gold-customers").innerHTML = goldCustomers;
}

// Run the functions
displayCustomerData();
displaySummaryStats();
