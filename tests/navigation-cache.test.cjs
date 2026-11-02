const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const worker = process.env.SW_FILE || path.join(__dirname, '..', 'sw.min.js');
function harness() {
  const events = {}, calls = {skip:0, claim:0, unregistered:0, deleted:[], navigated:[]};
  const caches = {keys:async()=>['chirpy-old','other-app-cache'],delete:async k=>{calls.deleted.push(k);return true},open:async()=>({addAll:async()=>{}})};
  const self = {location:{origin:'https://example.test'},addEventListener:(name,fn)=>{events[name]=fn},skipWaiting:async()=>{calls.skip++},registration:{unregister:async()=>{calls.unregistered++}},clients:{claim:async()=>{calls.claim++},matchAll:async()=>[{url:'https://example.test/categories/',navigate:async url=>calls.navigated.push(url)}]}};
  vm.runInNewContext(fs.readFileSync(worker,'utf8'),{self,caches,URL,importScripts(){},swconf:{purge:false,interceptor:{urlPrefixes:[],paths:[]},resources:[]}});
  return {events,calls};
}
async function fire(fn){let pending=Promise.resolve();fn({waitUntil:p=>{pending=p}});await pending}
test('upgraded worker activates immediately instead of keeping stale pages',async()=>{const h=harness();await fire(h.events.install);assert.equal(h.calls.skip,1)});
test('activation clears only old Chirpy caches and reloads already-open tabs',async()=>{const h=harness();await fire(h.events.activate);assert.deepEqual(h.calls.deleted,['chirpy-old']);assert.equal(h.calls.claim,1);assert.equal(h.calls.unregistered,1);assert.deepEqual(h.calls.navigated,['https://example.test/categories/'])});
