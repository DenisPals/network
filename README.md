# JoBase - A platform for employers and job seekers to meet
## Complexity
Network...

Some of the greater challenges were:
* The implementation of Google Places API. Though the documentation for Google Places API is very straightforward, the option to implement multiple search bars using the autocomplete function in one document (html page) is (as far as I am aware) not mentioned. After multiple trials, I decided to create a function that will move the search bar or better said swap the html id of the input field depending on where the user currently is. 
* The messaging service. To display messages in the appropriate timeline was (algorithmically) a challenge for me, as the user is loading multiple chats on the message page and they have to all be displayed in the right timeline. 
* The UI. I took a bit of my inspiration from [ineed](https://www.indeed.com) which also is a job board connecting employers and job seekers. I wanted to replicate the idea of scrolling through job posts on the left half of the window while having a fixed window displaying the selected post's information on the right half. The post's information should also grow and shrink depending if the user has scrolled down, thereby having more space based on the absence of the job search bar.

Additionally, custom icons and logos were made using [canva](https://www.canva.com). Bootstraps [icon library](https://icons.getbootstrap.com/) was also used for many of the UI elements.

## Files
**index.js**
Index.js containes the JavaScript for the entire project. No JavaScript frameworks have been used for this project. It contains functions for the creation of profils, editing profiles, fetch an employers created job listings, Google Places API (for search bar autocomplete), to prefill the profile page with the information the user has previously provided, loading all job posts, creating job posts, editing job posts, applying for jobs, viewing applications for a position, a full messaging feature to connect employer and candidate and also a toast generator (for Bootstrap pop up toasts).
**templates**
The templates in this project (html pages: index, layout, login, messagepage, mypage, profile, register) do not contain a lot of code. Most of the work was done with JavaScript, including html generation. Interestingly the project was originally designed to be a single-page application, an idea that I dismissed during the development because to increasing complexity. I still tried to keep certain functions single page and therefore there is a html page for each main function and the page changes using JavaScript.
**forms.py** 
In Forms.py I have created a form for the CV upload of ob job seekers. Currently the user is only allowed to upload PDFs (declared in JS and templates)
**views.py**
views.py is the enter server-side code for the project. It handles database manipulations, user identifications, etc. The functions needed to use Stripes API are also declared in views.py. Two main functions are declared:
* create_checkout_session - Create a checkout session for an item. The item needs to be defined in your store on [stripe](https://stripe.com/en-gb). This function is predefined by stripes documentation but I added some code to ensure only users can execute this function. The ID of the user is being passed in as a client_reference so that on completed transactions the webhook can update the job post to Active.
* webhook - In the urls.py file is a webhook (route), that will trigger the webhook function. The request is sent from the stripes server automatically as soon as the user fulfills the transaction. In the HTTP header, the client_reference_id is found which essentially is the ID the user has on the projects database. If the checkout session was completed, the job post the user created is activated and the expiry date is set (60 days active post). Every day a single HTTP request should need to be sent to the server to trigger the expiryCheck function. This function will deactivate all posts on the database that are expired. This process could be automated when bringing the application into production.
**models.py**
In models.py there are models for CVs, job seeker profiles, employer profiles, job posts, messages, applications, and user-specific applications.

## How to run
This web application is deployed on heroku but rather more a hobby project. JobBase can be found [here](https://jobbase.herokuapp.com/).