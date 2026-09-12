import test from 'node:test';
import assert from 'node:assert/strict';
import { PEOPLE } from '../src/data.js';
import { isMutual, filterPeople, findCircles, addRequest, validateStore } from '../src/domain.js';
test('a reciprocal match satisfies both requested skills, not just one',()=>{
 assert.equal(isMutual(PEOPLE[0],'Photography','Guitar'),true);
 assert.equal(isMutual(PEOPLE[3],'Photography','Guitar'),false);
 assert.deepEqual(filterPeople(PEOPLE,{teach:'Photography',learn:'Guitar',mutual:true}).map(p=>p.id),['maya']);
});
test('search and category intersect without mutating source data',()=>{
 const before=JSON.stringify(PEOPLE);
 const result=filterPeople(PEOPLE,{query:'  guitar  ',category:'Music'});
 assert.deepEqual(result.map(p=>p.id),['maya','priya']);
 assert.equal(JSON.stringify(PEOPLE),before);
});
test('no matching category or query returns a genuine empty result',()=>{
 assert.equal(filterPeople(PEOPLE,{query:'quantum knitting'}).length,0);
 assert.equal(filterPeople(PEOPLE,{query:'guitar',category:'Languages'}).length,0);
});
test('three-person circles close every directed lesson edge',()=>{
 const circles=findCircles(PEOPLE,'Photography','Guitar');
 assert.ok(circles.length>0);
 assert.ok(circles.some(c=>c.first.id==='sam'&&c.second.id==='priya'));
 for(const c of circles){
  assert.equal(c.first.learn,c.teach);
  assert.equal(c.second.learn,c.first.teach);
  assert.equal(c.second.teach,c.learn);
  assert.notEqual(c.first.id,c.second.id);
 }
});
test('the same person cannot occupy two seats and identical goals do not form a circle',()=>{
 assert.deepEqual(findCircles([{id:'one',teach:'Coding',learn:'Photography'},{id:'one',teach:'Guitar',learn:'Coding'}],'Photography','Guitar'),[]);
 assert.deepEqual(findCircles(PEOPLE,'Guitar','Guitar'),[]);
});
test('duplicate active requests are blocked; a removed exchange can be planned again',()=>{
 const request={key:'pair|maya|Photography|Guitar',status:'pending'};
 const first=addRequest([],request);
 assert.equal(first.duplicate,false);
 assert.equal(addRequest(first.requests,request).duplicate,true);
 assert.equal(addRequest([{...request,status:'cancelled'}],request).duplicate,false);
});
test('corrupt or incompatible storage cannot become application state',()=>{
 assert.deepEqual(validateStore(null),{offers:[],requests:[],saved:[]});
 assert.deepEqual(validateStore({version:2,offers:[{}]}),{offers:[],requests:[],saved:[]});
 assert.deepEqual(validateStore({version:1,offers:[{},null],requests:[{},null],saved:[null,7,'maya','maya']}),{offers:[],requests:[],saved:['maya']});
});
