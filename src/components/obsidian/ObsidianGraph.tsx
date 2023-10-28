import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import axios from "axios";
import Graph from "graphology";
import gexf from "graphology-gexf";
import ForceSupervisor from "graphology-layout-force/worker";
import Sigma from "sigma";

export const ObsidianGraph = component$(() => {
  const container = useSignal<HTMLElement>();
  const text = useSignal<string>();

  useVisibleTask$(async () => {
    await axios
      .get<string>(
        "https://raw.githubusercontent.com/indicozy/notes/master/nodes.gexf"
      )
      .then((res) => {
        text.value = res.data;
      })
      .catch(() => {
        // TODO error here
      });
  });
  useVisibleTask$(async ({ track }) => {
    track(() => container.value && text.value);
    const ref = container.value;
    if (ref !== undefined && text.value !== undefined) {
      const graph = gexf.parse(Graph, text.value);

      // Create the spring layout and start it
      const layout = new ForceSupervisor(graph, {
        isNodeFixed: (_, attr) => attr.highlighted,
      });
      layout.start();

      // Create the sigma
      const renderer = new Sigma(graph, ref);

      //
      // Drag'n'drop feature
      // ~~~~~~~~~~~~~~~~~~~
      //

      // State for drag'n'drop
      let draggedNode: string | null = null;
      let isDragging = false;

      // On mouse down on a node
      //  - we enable the drag mode
      //  - save in the dragged node in the state
      //  - highlight the node
      //  - disable the camera so its state is not updated
      renderer.on("downNode", (e) => {
        isDragging = true;
        draggedNode = e.node;
        graph.setNodeAttribute(draggedNode, "highlighted", true);
      });

      // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
      renderer.getMouseCaptor().on("mousemovebody", (e) => {
        if (!isDragging || !draggedNode) return;

        // Get new position of node
        const pos = renderer.viewportToGraph(e);

        graph.setNodeAttribute(draggedNode, "x", pos.x);
        graph.setNodeAttribute(draggedNode, "y", pos.y);

        // Prevent sigma to move camera:
        e.preventSigmaDefault();
        e.original.preventDefault();
        e.original.stopPropagation();
      });

      // On mouse up, we reset the autoscale and the dragging mode
      renderer.getMouseCaptor().on("mouseup", () => {
        if (draggedNode) {
          graph.removeNodeAttribute(draggedNode, "highlighted");
        }
        isDragging = false;
        draggedNode = null;
      });

      // Disable the autoscale at the first down interaction
      renderer.getMouseCaptor().on("mousedown", () => {
        if (!renderer.getCustomBBox())
          renderer.setCustomBBox(renderer.getBBox());
      });

      // CUSTOM

      renderer.on("doubleClickNode", (e) => {
        console.log(e.node);
        // Prevent sigma to move camera:
        e.preventSigmaDefault();
      });
    }
  });

  return <div ref={container} style={{ height: "600px" }} />;
});
