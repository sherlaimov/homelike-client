- Original Assignment Code

## Client

1. Turned many React class components into simple functions because they are not dependent on their internal state. Introduced the modern React hooks.
2. Removed redux. For state management we could use Apollo's cache provided we need it at all in our application. From the official Apollo docs:

> We recommend managing local state in the Apollo cache instead of bringing in another state management library like Redux so the Apollo cache can be a single source of truth.

 3. Used Apollo's `gql` to create GraphQL queries and execute them with `useQuery`.

 4. In order to output owners' details in ApartmentView.js I had to play around with the backend to fix a bug which otherwise prevented us from linking the `owners` table to `profiles`.

Namely, I changed the *user resolver* on the backend to use the respective Profiles model for db queries. I ended up adding these lines in gql query on the client (ApartmentView.js):

    # Fixed a backend bug to stitch profile data with the owner context in a single query
            profile {
              firstName
              lastName
              role
            }

This allowed pulling the profile data associated with the owner data. 

5. Created a **search page** available at [`http://localhost:3000/search`](http://localhost:3000/search)

This one was a big conundrum. I spent hours playing with GraphiQL to learn how to create search queries as well as to find out why it was impossible to pull the **locations** data. However, since the assignment clearly states that one doesn't need to change anything on the server to solve the task, I decided to pull the data straight from the `/apartments` and `/locations` endpoints. Please, take a look at the SearchView.js file. It's got a lot of unpleasant code because I had to normalize/merge the data to create the searching and filtering functionality required. Take notice that the filters as well as the search work together as a single filter pipe.

6. I added Webpack on top of this CRA project. However, so far I haven't implemented the full functionality provided by the CRA cli. Would have to invest more time, exploring Webpack's documentation. Use `npm run web:start` to start Webpack.


# Homelike client for assignment

## Background information

### installation & run
1. start the server in the `../server` folder
2. start the client:
    - npm i
    - npm start

## What to do
1. Invest some time to refactor the current code and make it better
    - please also tell us what you did
1. Add webpack
1. Add information about owner to apartment view page
1. Add new page "Locations", show the apartments filtered by location
1. Add new page "search page", provide abilities to search by location and filter by [size, price, amenities, details, services]

**important**: _there is no need to change any "server" lines of code to complete this assignment_
