# USI-Test-Framework

## Technologies 

1. Node.js 
2. Puppeteer
3. Mocha
4. Chai

git clone https://github.com/Duran914/USI-Test-Framework.git

npm install

To run all test files (will run all scripts in /test directory)
``` Javascript
 mocha --no-timeout --slow 100000
```

To run a single test file ( ex. One company file)

``` Javascript
mocha -g "Company_name" --no-timeout --slow 10000
```

To run a single test (One campaign test; The name of one describe() function)

``` Javascript
mocha -g "Company TT 12345" --no-timeout --slow 10000
```