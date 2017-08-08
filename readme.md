# Technologies
- [Laravel 5.4](https://laravel.com/docs/5.4)
- [Vue.js 2](https://vuejs.org/v2/guide/)
- [xmlStreamReader](https://github.com/hobnob/xmlStreamReader)

# Installation

##### Back-end
- [Check laravel 5.4 requirements](https://laravel.com/docs/5.4/installation#installation)
- Install all back-end dependencies
    ```
    $ composer install
    ```
- Directories within the "storage" and the "bootstrap/cache" directories should be writable by your web server or Laravel will not run. e.g.
    ```
    $ chmod -R 777 storage
    $ chmod -R 777 bootstrap/cache
    ```
- Rename **.env.example** to **.env**
- Generate key
    ```
    $ php artisan key:generate
    ```
- Make sure mod_rewrite is enabled in apache
    ```
    $ sudo a2enmod rewrite
    ```

##### Front-end
- You must first ensure that [Node.js and NPM](https://www.npmjs.com/get-npm) are installed on your machine.
- Install all front-end dependencies
    ```
    $ npm install
    ```

# Additional Information
- Apache webserver is used for development and testing
- Just use the homepage to test it e.g. http://localhost/tradetracker-test/public/
- Tested in Chrome only, Ubuntu 16.04 OS
- The solution can't handle the entire XML example given. It will experience browser crash. You can try to limit the request. :(

**Let me know if you need more information by contacting me through jaypee.kans@gmail.com. Cheers!**
