(window["webpackJsonposa3.13f"]=window["webpackJsonposa3.13f"]||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),u=t.n(r),l=t(2),c=function(e){var n=e.value,t=e.handleChange;return o.a.createElement("div",null,"Rajaa n\xe4ytett\xe4vi\xe4:",o.a.createElement("input",{value:n,onChange:t}))},s=t(3),i=t.n(s),m="http://localhost:3001/api/persons",f=function(){return i.a.get(m).then(function(e){return e.data})},d=function(e){return i.a.post(m,e).then(function(e){return e.data})},p=function(e,n){console.log("*Personservice upd: url ",m),console.log("*Personservice upd: id ",e);var t=i.a.put("".concat(m,"/").concat(e),n);return console.log("Personservice put: ".concat(m,"/").concat(e)),t.then(function(e){return e.data})},v=function(e){return i.a.delete("".concat(m,"/").concat(e)).then(function(e){return e.data})},E=function(e){return e.name.toUpperCase().startsWith(e.filter.toUpperCase())||""===e.filter?o.a.createElement("div",null,e.name,"\xa0\xa0",e.number," \xa0\xa0",o.a.createElement("button",{onClick:function(n){return function(e){var n=v(e.id);console.log("***respData: ",n),e.setErrorMessage("Henkil\xf6  '".concat(e.name,"' on poistettu.")),setTimeout(function(){e.setErrorMessage(null)},3e3),e.setPersons(e.persons.filter(function(n){return n.id!==e.id}))}(e)}},"Delete")):""},h=function(e){var n=e.persons,t=e.setPersons,a=e.newFilter;return n.map(function(r){return o.a.createElement(E,{name:r.name,number:r.number,id:r.id,filter:a,persons:n,setPersons:t,deletePerson:e.deletePerson,setErrorMessage:e.setErrorMessage})})},g=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"error"},n)},b=function(e){var n=Object(a.useState)([]),t=Object(l.a)(n,2),r=t[0],u=t[1],s=Object(a.useState)("qwerty"),i=Object(l.a)(s,2),m=i[0],v=i[1],E=Object(a.useState)("1234567890"),b=Object(l.a)(E,2),P=b[0],j=b[1],O=Object(a.useState)(""),w=Object(l.a)(O,2),C=w[0],y=w[1],k=Object(a.useState)(""),S=Object(l.a)(k,2),T=S[0],A=S[1];Object(a.useEffect)(function(){f().then(function(e){u(e)})},[]);return o.a.createElement("div",null,o.a.createElement("h2",null,"Puhelinluettelo"),o.a.createElement(g,{message:T}),o.a.createElement("div",null,o.a.createElement(c,{value:C,handleChange:function(e){y(e.target.value)}})),o.a.createElement("h3",null,"Lis\xe4\xe4 uusi"),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n=r.findIndex(function(e){return e.name.toUpperCase()===m.toUpperCase()});if(n>-1){if(!window.confirm("".concat(m," on jo luettelossa, korvataanko numero?")))return A("Tapahtuma on hyl\xe4tty."),setTimeout(function(){A(null)},3e3),0;console.log("*AddPerson --- 1 pos: ",n),console.log("*AddPerson --- 2 id: ",r[n].id),console.log("*AddPerson --- 3 person: ",r[n]);var t={name:m,number:P};p(r[n].id,t).then(function(e){u(r.map(function(t){return t.id!==r[n].id?t:e})),A("Puhelinnumero on p\xe4ivitetty. uuusi numero on '".concat(P,"' "))}).catch(function(e){var n="Puhelinnumeron p\xe4ivitys ep\xe4onnistui.  ";e.message.includes("404")&&(n=n.concat("Asiakas on jo poistettu!!")),A(n)}),setTimeout(function(){A(null)},3e3)}else{d({name:m,number:P}).then(function(e){u(r.concat(e))}),A("uusi henkil\xf6 lis\xe4tty."),setTimeout(function(){A(null)},3e3)}console.log("*AddPerson --- END")}},o.a.createElement("div",null,"nimi: ",o.a.createElement("input",{value:m,onChange:function(e){v(e.target.value)}})),o.a.createElement("div",null,"numero:",o.a.createElement("input",{value:P,onChange:function(e){j(e.target.value)}})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))),o.a.createElement("h2",null,"Numerot"),o.a.createElement(h,{persons:r,newFilter:C,setPersons:u,setErrorMessage:A,deletePerson:function(e){console.log("DELETEPERSON:",e)}}))};t(36);u.a.render(o.a.createElement(b,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.2aa14884.chunk.js.map