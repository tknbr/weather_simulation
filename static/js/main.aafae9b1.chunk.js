(this.webpackJsonpweather_simulation=this.webpackJsonpweather_simulation||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports=n(17)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(7),i=n.n(a),s=(n(13),n(14),n(1)),c=n(2),u=n(3),l=n(5),d=n(4),f=(n(15),function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={},o}return Object(u.a)(n,[{key:"render",value:function(){var e=this.props,t=e.row,n=e.col,o=e.typeOfNode,a=(e.windNorth,e.windSouth,e.windEast,e.windWest,e.onMouseDown),i=e.onMouseEnter,s=e.onMouseUp,c="";switch(o){case"air":c="node node_air";break;case"water":c="node node_water";break;case"soil":c="node node_soil";break;case"cloud":c="node node_cloud";break;default:c="node node_air"}return r.a.createElement("div",{id:"node-".concat(t,"-").concat(n),className:c,onMouseDown:function(){return a(t,n)},onMouseEnter:function(){return i(t,n)},onMouseUp:function(){return s()}})}}]),n}(o.Component)),h=(n(16),function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={grid:[],mouseIsPressed:!1},o}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=w();this.setState({grid:e})}},{key:"handleMouseDown",value:function(e,t){var n=m(this.state.grid,e,t);this.setState({grid:n,mouseIsPressed:!0})}},{key:"handleMouseEnter",value:function(e,t){if(this.state.mouseIsPressed){var n=m(this.state.grid,e,t);this.setState({grid:n,mouseIsPressed:!0})}}},{key:"handleMouseUp",value:function(){this.setState({mouseIsPressed:!1})}},{key:"weatherSim",value:function(){for(var e=0,t=10,n=[],o=this.state.grid.slice(),r=Math.floor(2.5);r<=Math.floor(7.5);r++)for(var a=0;a<15;++a)"air"===o[r][a].typeOfNode&&"soil"===o[r+1][a].typeOfNode&&(o[r][a].windNorth=1,n.push(o[r][a]),document.getElementById("node-".concat(9-r,"-").concat(a)).className="node node_cloud");for(;n.length>0;){var i=n.shift();console.log(i);var s=p(i);0!==s&&(s>0||O(o,i.row,i.col))}for(;t>=0;)++e>23&&(e=0,--t);console.log("simulation finished")}},{key:"render",value:function(){var e=this,t=this.state.grid;return console.log(t),r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:function(){return e.weatherSim()}},"Start"),r.a.createElement("div",{className:"grid"},t.map((function(t,n){return r.a.createElement("div",{key:n},t.map((function(t,n){var o=t.row,a=t.col,i=t.typeOfNode;return r.a.createElement(f,{key:n,row:o,col:a,typeOfNode:i,windNorth:0,windSouth:0,windEast:0,windWest:0,onMouseDown:function(t,n){return e.handleMouseDown(t,n)},onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)},onMouseUp:function(){return e.handleMouseUp()}})})))}))))}}]),n}(o.Component)),w=function(){for(var e=[],t=9;t>=0;t--){for(var n=[],o=0;o<15;o++)n.push(v(o,t));e.push(n)}return e},v=function(e,t){return{row:t,col:e,typeOfNode:t<2.5?"water":"air"}},m=function(e,t,n){var o=e.slice(),r=o[9-t][n];switch(r.typeOfNode){case"water":case"air":for(var a=9-t;a<10;a++){r=o[a][n];var i=Object(s.a)(Object(s.a)({},r),{},{typeOfNode:"soil"});o[a][n]=i}break;case"soil":for(var c=9-t;c>=0;c--){r=o[c][n],console.log("r= "+c+" (3*TOTAL_N_OF_ROWS)/4 = 7.5");var u=Object(s.a)(Object(s.a)({},r),{},{typeOfNode:c>=Math.floor(7.5)?"water":"air"});o[c][n]=u}break;default:console.log("Should never reach this point")}return o},p=function(e){var t=e.windNorth+e.windSouth+e.windWest+e.windEast;return t>0?1:t<0?-1:0},O=function(e,t,n){return"none"};var g=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(h,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.aafae9b1.chunk.js.map