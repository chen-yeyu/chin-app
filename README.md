# Redux-React example

function* foo(x) {

  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}
 
var b = foo(5);
b.next()   // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }


重点：

next方法的参数表示上一个yield表达式的返回值！！不是函数中参数（如本例的x）的值！不可混淆！！！



理解：
代码第一次调用b的next方法时，x=5,返回x+1的值6；

第二次调用next方法，将上一次yield表达式的值设为12，即 yield（x+1）==> 12，因此y等于24，z=y / 3为8；

第三次调用next方法，将上一次yield表达式的值设为13，即yield(y/3)==》13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。
