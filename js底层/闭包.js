// 闭包
var name;

function makeFunc() {
  name = "Mozilla";

  function displayName() {
    console.log(name + "gghh")
  }

  return displayName
}

makeFunc();  // 执行后makeFunc(), name立即销毁

// myFunc 变成一个闭包，由 displayName 函数和闭包创建时存在的 “Mozilla” 字符串形成。
// displayName()被赋予在一个全局变量myFunc下
var myFunc = makeFunc()
myFunc()



/******************************** 闭包作用 ***********************************/
  // 在面对象编程中，对象允许我们将某些数据（对象的属性）与一个或者多个方法相关联。

var makeCounter = function () {
    // 环境中包含两个私有项：名为 privateCounter 的变量和名为 changeBy 的函数。
    var privateCounter = 0;

    function changeBy(val) {
      privateCounter += val;
    }

    return {
      increment: function () {
        changeBy(1);
      },
      decrement: function () {
        changeBy(-1);
      },
      value: function () {
        return privateCounter;
      }
    }
  };

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value());

Counter1.increment();
Counter1.increment();
console.log(Counter1.value());

Counter1.decrement();
console.log(Counter1.value());

console.log(Counter2.value());

/***************************************************/
// 函数嵌套函数，但内层函数是通过 闭包 获取外层函数中定义的变量值，不是直接继承this。
// 将this用self或者其他的变量缓存起来，区分外层与内层的this。但将方法做为参数传递，不起作用。

//   this是执行上下文环境的一个属性，而不是某个变量对象的属性

// 解决：用bind方法显示指明上下文，
// bind可以任意改变函数或方法的执行上下文，即使它没有被绑定到一个实例的原型上。
// 同时也可以使用apply或call 来调用该方法或函数，让它在一个新的上下文中执行。

function Thing() {
}

Thing.prototype.foo = "bar";
//把实例的方法作为参数传递时，实例不会跟着过去。this在调用时指向全局或者是undefined
Thing.prototype.logFoo = function () {
  console.log(this.foo);
}

function doIt(method) {
  method();
}

var thing = new Thing();
//doIt(thing.logFoo);
doIt(thing.logFoo.bind(thing));


/****************************** 性能 **********************************/
//如果没有特殊需要，在其它函数中创建函数是不明智的，因为闭包对脚本性能具有负面影响，包括处理速度和内存消耗。
//例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。
// 原因是这将导致每次构造器被调用，方法都会被重新赋值一次（也就是说，为每一个对象的创建）

//考虑以下虽然不切实际但却说明问题的示例：
function MyObject(name, message) {
  this.name = name;
  this.message = message;
  this.getName = function () {
    return this.name;
  };
  this.getMessage = function () {
    return this.message;
  };
}


//上面的代码并未利用到闭包的益处，因此，应该修改为如下常规形式：
function MyObject(name, message) {
  this.name = name;
  this.message = message;
}

MyObject.prototype = { //继承的原型可以为所有对象共享，且不必在每一次创建对象时定义方法。
  getName: function () {
    return this.name;
  },
  getMessage: function () {
    return this.message;
  }
};

