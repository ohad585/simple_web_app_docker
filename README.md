# Simple web app with docker

The web app counts the number of times each ip entered the site .
Docker-compose is used in order to run in production and in development.


## Usage

For development:
```bash
docker-compose -f docker-compose-dev.yml up --build 
```

For production:
```bash
docker-compose up --build 
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
