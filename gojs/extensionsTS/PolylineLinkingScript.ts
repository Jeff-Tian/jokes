/*
*  Copyright (C) 1998-2019 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from '../release/go';
import { PolylineLinkingTool } from './PolylineLinkingTool';

let myDiagram: go.Diagram;

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;

  myDiagram =
    $(go.Diagram, 'myDiagramDiv');

  // install custom linking tool, defined in PolylineLinkingTool.js
  const tool = new PolylineLinkingTool();
  // tool.temporaryLink.routing = go.Link.Orthogonal;  // optional, but need to keep link template in sync, below
  myDiagram.toolManager.linkingTool = tool;

  myDiagram.nodeTemplate =
    $(go.Node, 'Spot',
      { locationSpot: go.Spot.Center },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape,
        {
          width: 100, height: 100, fill: 'lightgray',
          portId: '', cursor: 'pointer',
          fromLinkable: true,
          fromLinkableSelfNode: true, fromLinkableDuplicates: true,  // optional
          toLinkable: true,
          toLinkableSelfNode: true, toLinkableDuplicates: true  // optional
        },
        new go.Binding('fill')),
      $(go.Shape, { width: 70, height: 70, fill: 'transparent', stroke: null }),
      $(go.TextBlock,
        new go.Binding('text')));

  myDiagram.linkTemplate =
    $(go.Link,
      { reshapable: true, resegmentable: true },
      // { routing: go.Link.Orthogonal },  // optional, but need to keep LinkingTool.temporaryLink in sync, above
      { adjusting: go.Link.Stretch },  // optional
      new go.Binding('points', 'points').makeTwoWay(),
      $(go.Shape, { strokeWidth: 1.5 }),
      $(go.Shape, { toArrow: 'OpenTriangle' }));

  load();  // load a simple diagram from the textarea
}

// save a model to and load a model from Json text, displayed below the Diagram
export function save() {
  const str = myDiagram.model.toJson();
  (document.getElementById('mySavedModel') as any).value = str;
}
export function load() {
  const str = (document.getElementById('mySavedModel') as any).value;
  myDiagram.model = go.Model.fromJson(str);
  myDiagram.model.undoManager.isEnabled = true;
}
