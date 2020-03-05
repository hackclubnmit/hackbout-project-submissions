# Dependencies

1. Install [Docker](https://hub.docker.com/search/?type=edition&offering=community).
1. Set up the DB.
    1. Create a [Heroku](https://heroku.com/) app.
    1. Provision the [mLab add-on](https://elements.heroku.com/addons/mongolab).
    1. Retrieve the `MONGODB_URI` connection string from your Heroku app's config vars. Save it for later.
    1. Create a file named `.env`.
    1. Add the line `MONGODB_URI=<URI>` to `.env`. Replace `<URI>` with the connection string you retrieved earlier.