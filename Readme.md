
# behavior-tree

[behavior trees](http://www.altdevblogaday.com/2011/02/24/introduction-to-behavior-trees/) implementation

## tl;dr

Turns giant conditional spaghetti code to more
manageable and easy to iterate and compose.

Replaces hard to manage and problematic state machines.

## Example

```js
var behavior = require('behavior-tree');
var sequence = behavior.sequence;
var select = behavior.select;

// snippet below grabbed from an actual game
var e = player;

e.motion = select([
  sequence([
    e.isUser,

    select([
      sequence([
        e.isPassTarget,
        e.walkToBall,
        e.fixFeet,
        e.checkBallCollision,
        e.stand,
        e.makeBallOwner,
      ]),

      sequence([
        not(e.isPassTarget),
        e.isBallOwner,
        e.ctrl,
        e.walk,
        e.fixFeet,
        e.checkBallCollision,
        not(e.isBallKicker),
        e.dribble,
      ]),

      sequence([
        not(e.isPassTarget),
        e.isBallLoose,
        e.isNearest,
        e.ctrl,
        e.walk,
        e.fixFeet,
        e.checkBallCollision,
        not(e.isBallKicker),
        e.makeBallOwner,
        e.dribble,
      ]),

    ]),
  ]),

  sequence([
    e.isCpu,
  ]),
]);

function not(fn){
  return function(){
    return !fn.call(this);
  };
}

loop.on('update', e.motion.bind(e));
```

## License

MIT
