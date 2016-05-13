const Router = require('../');

let router = new Router();

router.get('/', function *(next){
    this.body = 'Hello, world!';
});

router.post('/:id', function *(next){
    this.type = 'json';
    this.body = this.params;
});

router.use(function *(next){
    // do something here.
    yeld *next;

    // and do something here.
});

// Same as use.
router.all(function *(next){
    // do something here.
    yeld *next;

    // and do something here.
});

module.exports = router;
