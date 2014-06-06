var Benchmark = require("benchmark");

var suite = new Benchmark.Suite();
var jom = require("./index.js");

jom.makeSetter("hello");
jom.makeSetter("a.b.c.d.e.f.g");
jom.makeSetter("b.b.c.d.e.f.g");
jom.makeSetter("c.b.c");
jom.makeSetter("d.b.c.d");
jom.makeSetter("e.b.0.d.e.f.g");

jom.makeSetterR("hello");
jom.makeSetterR("a.b.c.d.e.f.g");
jom.makeSetterR("b.b.c.d.e.f.g");
jom.makeSetterR("c.b.c");
jom.makeSetterR("d.b.c.d");
jom.makeSetterR("e.b.0.d.e.f.g");


suite.add("set", function(){
	var obj = {};
	jom.set(obj, "hello", "there");
	jom.set(obj, "a.b.c.d.e.f.g", "foo");
	jom.set(obj, "b.b.c.d.e.f.g", "foo");
	jom.set(obj, "c.b.c", "foo");
	jom.set(obj, "d.b.c.d", "foo");
	jom.set(obj, "e.b.0.d.e.f.g");
})
.add("setN", function(){
	var obj = {};
	jom.setN(obj, "hello", "there");
	jom.setN(obj, "a.b.c.d.e.f.g", "foo");
	jom.setN(obj, "b.b.c.d.e.f.g", "foo");
	jom.setN(obj, "c.b.c", "foo");
	jom.setN(obj, "d.b.c.d", "foo");
	jom.setN(obj, "e.b.0.d.e.f.g");
})
.add("set-gen", function(){
	var obj = {};
	jom.setGen(obj, "hello", "there");
	jom.setGen(obj, "a.b.c.d.e.f.g", "foo");
	jom.setGen(obj, "b.b.c.d.e.f.g", "foo");
	jom.setGen(obj, "c.b.c", "foo");
	jom.setGen(obj, "d.b.c.d", "foo");
	jom.setGen(obj, "e.b.0.d.e.f.g");
})
.add("set-gen-noreassign", function(){
	var obj = {};
	jom.setGenR(obj, "hello", "there");
	jom.setGenR(obj, "a.b.c.d.e.f.g", "foo");
	jom.setGenR(obj, "b.b.c.d.e.f.g", "foo");
	jom.setGenR(obj, "c.b.c", "foo");
	jom.setGenR(obj, "d.b.c.d", "foo");
	jom.setGenR(obj, "e.b.0.d.e.f.g");
})
.on("cycle", function(e){
	console.log(String(e.target));
})
.run();
