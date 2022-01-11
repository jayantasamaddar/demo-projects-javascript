# AN INTRODUCTION TO ASYNCHRONOUS JAVASCRIPT HTTP REQUESTS
----------------------------------------------------------
## What are HTTP Requests?
---------------------------
HTTP Requests are how most data is sent and received over the internet.
Data can be sent and received synchronously or asynchronously.
A status is received from the server upon completing the requests and can be the following:- 

- `101`, `204`, `205` or `305` is a null body status
- `200` to `299`, inclusive, is an OK status (success)
- `301`, `302`, `303`, `307` or `308` is a redirect status
- `404` is an not found status (error)


## The need for Asynchronous
----------------------------
Normally, a given program's code runs straight along, with only one thing happening at once. If a function relies on the result of another function, it has to wait for the other function to finish and return, and until that happens, the entire program is essentially stopped from the perspective of the user.

This is a frustrating experience and isn't a good use of computer processing power — especially in an era in which computers have multiple processor cores available. There's no sense sitting there waiting for something when you could let the other task chug along on another processor core and let you know when it's done. This lets you get other work done in the meantime, which is the basis of asynchronous programming. It is up to the programming environment you are using (web browsers, in the case of web development) to provide you with APIs that allow you to run such tasks asynchronously.


## Asynchronous JavaScript
---------------------------
Asynchronous techniques are very useful, particularly in web programming. When a web app runs in a browser and it executes an intensive chunk of code without returning control to the browser, the browser can appear to be frozen. This is called **blocking**; the browser is blocked from continuing to handle user input and perform other tasks until the web app returns control of the processor.

Why is this? The answer is because JavaScript, generally speaking, is single-threaded. At this point, we need to introduce the concept of threads.

### Thread
-----------
A thread is basically a single process that a program can use to complete tasks. Each thread can only do a single task at once:

> Task A --> Task B --> Task C
Each task will be run sequentially; a task has to complete before the next one can be started.
Hence it can be said that JavaScript traditionally will execute code top-to-bottom.

Many computers now have multiple cores, so can do multiple things at once. Programming languages that can support multiple threads can use multiple cores to complete multiple tasks simultaneously:

> **Thread 1: Task A --> Task B**
> **Thread 2: Task C --> Task D**

### JavaScript being Single Threaded
------------------------------------
JavaScript is traditionally single-threaded. Even with multiple cores, you could only get it to run tasks on a single thread, called the main thread.

> Main thread: Render circles to canvas --> Display alert()

After some time, JavaScript gained some tools to help with such problems. [**Web workers**](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) allow you to send some of the JavaScript processing off to a separate thread, called a worker so that you can run multiple JavaScript chunks simultaneously. You'd generally use a worker to run expensive processes off the main thread so that user interaction is not blocked.

> **Main thread: Task A --> Task C**
> **Worker thread: Expensive task B**

We explore these three methods of asynchronous Javascript requests :- 


## METHOD 1 - Using AJAX - XHTTP Requests
-----------------------------------------
### Introduction
-----------------
Since IE5 was released in 1998, we've had the option to make asynchronous network calls in the browser using the XMLHttpRequest (XHR).

Quite a few years after this, Gmail and other rich apps made heavy use of it, and made the approach so popular that it had to have a name: AJAX.

### Key Notes
-------------
- Ajax HTTP Requests are the pre ES5 way of sending and receiving data asynchronously on JavaScript.
- jQuery has its own helper functions built around it:
    - `jQuery.jax()`
    - `jQuery.get()`
    - `jQuery.post()`



## METHOD 2 - Using the fetch API that utilizes Promises introduced in ES2015
-----------------------------------------------------------------------------
### Introduction
----------------
The [**Fetch API**](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) introduced in ES2015 with [**Promises**](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises) provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It also provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.

This kind of functionality was previously achieved using XMLHttpRequest. Fetch provides a better alternative that can be easily used by other technologies such as Service Workers. Fetch also provides a single logical place to define other HTTP-related concepts such as CORS and extensions to HTTP.

The fetch specification differs from jQuery.ajax() in the following significant ways:

- The Promise returned from `fetch()` won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, as soon as the server responds with headers, the Promise will resolve normally (with the ok property of the response set to false if the response isn’t in the range 200–299), and it will only reject on network failure or if anything prevented the request from completing.

- `fetch()` won’t send cross-origin cookies unless you set the credentials init option. (Since April 2018. The spec changed the default credentials policy to same-origin. Firefox changed since 61.0b13.)


### Key Notes:
--------------
- Fetch will always return a [**Promise**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
- The Promise needs to be converted to usable JSON before parsing further.
- The Promise returned from fetch() won't reject on HTTP error status even if the response is a HTTP 404 or 500. Instead it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.
- fetch() won't send cross-origin cookies unless you set the credentials init option (to include). In April 2018, the spec changed the default credentials policy to 'same-origin'. If you are targetting older versions of Firefox (pre 61.0b13), Safari 12, Chrome 68, be sure to include credentials: 'same-origin' option on all api requests that may be affected by cookies/user login state.


## METHOD 3 - Using Async functions introduced in ES2017
---------------------------------------------------------
### Introduction
----------------
More recent additions to the JavaScript language are `async` functions and the `await` keyword, added in ECMAScript 2017. These features basically act as syntactic sugar on top of promises, making asynchronous code easier to write and to read afterwards. They make async code look more like old-school synchronous code.

### Key Notes:
--------------
- The `async` keyword is put in front of a function declaration to turn it into an async function. An async function is a function that knows how to expect the possibility of the `await` keyword being used to invoke asynchronous code.
- The `async` keyword is added to functions to tell them to return a promise rather than directly returning the value.
- The `await` keyword. await only works inside async functions within regular JavaScript code, however it can be used on its own with [**JavaScript modules**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
- `await` can be put in front of any async promise-based function to pause the code on that line until the promise fulfills, then return the resulting value.
- Errors in `async` functions are handled with the the [`try...catch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)