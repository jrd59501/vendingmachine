Vending Machine Simulator – Team README
Overview

This project is a front-end vending machine simulator built for CISY 5303 – Web Programming 1.
The goal is to use real API data, render items dynamically, allow users to “deposit” money, select products, and simulate purchases.

The project currently:

Loads product data from the OpenFoodFacts API, based on specific search terms.

Displays a grid of vending machine items.

Allows money input through preset buttons.

Lets the user select an item, buy it, and updates quantity and balance.

Returns change when requested.

Follows separation-of-concerns with multiple JS classes (API, UI, logic).

It is functioning — but still needs polish, speed improvements, and business logic expansion.

What Works Right Now
1. API Integration

We successfully fetch product images using real OpenFoodFacts product IDs.

The system reliably loads items when specific search terms (Snickers, KitKat, Coke, Red Bull, etc.) are defined in the config.

Images show up consistently now that we are using precise search queries.

2. JSON Product List

A local JSON file stores our vending machine items (name, price, barcode).

API fetch uses the barcode to request the correct product image.

This means we have hard-coded products, but the images remain API-driven (which satisfies project requirements).

3. UI + Item Rendering

Items render as clickable cards.

Each card shows:

Product image

Product name

Price

Quantity (dynamic)

4. Money System

Dollar and coin buttons work.

Balance updates in real time.

Purchases deduct balance automatically.

Return Change button refunds remaining balance.

5. Basic Business Logic

User must select an item before buying.

User must have enough balance.

Item must be in stock.

UI gives clear messages (selected item, not enough money, etc.).

What Still Needs Work (Team To-Do List)
1. Make the UI look better

Right now, the UI works, but visually it’s:

too spaced out

not centered well

inconsistent sizing

not animated

needs better mobile layout

Design tasks:

Add CSS Grid with tighter spacing

Improve cards (rounded corners, shadows, hover effects)

Add responsive styling (mobile/tablet)

Center header + balance section better

2. Speed + API Optimization

API calls can be slow because:

we fetch multiple resources individually

responses sometimes contain slow images

the API structure is inconsistent

Fix ideas:

Cache fetched items in localStorage

Pre-define images for items that fail

Load images lazily

Only fetch image URLs instead of full item lists

3. Fuller Business Logic (Required for Final Version)

We need to add more "real vending machine" logic, including:

A. Session / End Transaction

When the user ends the session, return money

Save the session to local storage

Reset all UI state

B. “Machine Inventory Mode” (Admin Mode)

For example:

View total sales

Restock items

Change prices

C. Reporting System

We need at least one of:

A simple transaction log

A breakdown of what was purchased

A daily or session-based summary

Which items sell most

A local JSON log or localStorage log is enough.

4. Error Handling

Right now:

Missing images sometimes break the layout

If an API call fails, we only show one message

Quantity can show “undefined” if something loads wrong

We should:

Validate all API return data

Provide fallback images

Add more detailed error messages

Make sure quantity always has a value

5. Cleanup and Refactoring

Before presenting:

Remove console logs

Add readable comments

Organize files cleanly

Ensure naming is consistent

We already have good separation of concerns:

vendingmachine.js – logic

moneyhandler.js – money

uiController.js – UI

apiservice.js – API logic

items.json – product list

main.js – glue code

We just need to polish it.

Summary

This project already:

Meets API requirement

Renders real products

Provides a functioning vending machine simulation

Uses modular JS classes