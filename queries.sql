-- Query 1: Display the ProductName and CategoryName for all products in the database. Returns 77 records.
SELECT ProductName, CategoryName
FROM Products
JOIN Categories ON Products.CategoryID = Categories.CategoryID;

-- Query 2: Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Returns 429 records.
SELECT Orders.OrderID, Shippers.CompanyName
FROM Orders
JOIN Shippers ON Orders.ShipVia = Shippers.ShipperID
WHERE Orders.OrderDate < '2012-08-09';

-- Query 3: Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Returns 3 records.
SELECT Products.ProductName, OrderDetails.Quantity
FROM Products
JOIN OrderDetails ON Products.ProductID = OrderDetails.ProductID
WHERE OrderDetails.OrderID = 10251
ORDER BY Products.ProductName;

-- Query 4: Display the OrderID, customer's Company Name, and the employee's Last Name for every order. All columns should be labeled clearly. Returns 16,789 records.
SELECT Orders.OrderID, Customers.CompanyName AS CustomerCompanyName, Employees.LastName AS EmployeeLastName
FROM Orders
JOIN Customers ON Orders.CustomerID = Customers.CustomerID
JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID;
