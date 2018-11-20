# Max-Hamburgare

This skeleton code contains a back-end for your burger ordering system as well as stubs for building views and maintaining a clean folder structure. Take some time to get acquainted with the different files and how they are connected.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Browser

When server is running, visit the following pages in a web browser:

http://localhost:8080/#/

http://localhost:8080/#/kitchen

### Start looking at the code

Start at Ordering.vue in the folder views. You will notice that the code is a structured a bit differently than in the lab. Instead of separating code by language type (HTML, CSS, and JS), it is now separated by page or component so that, for instance, all CSS that is specific for a component is placed in the same .vue file as the HTML and the Vue JS scripts. This makes it easier to manage larger projects that will contain thousands of lines of code.

Notice how the template is using two different components Ingredient and OrderItem. You will find the declarations for these in the folder components.

Try to read the code and figure out how things are connected. One special file, which is important to pay attention to is sharedVueStuff.js in components. This contains code that is used both in Ordering.vue and Kitchen.vue, which is read in as a mixin. This complicates the structure a bit but is a nifty way of keeping code duplication low.
