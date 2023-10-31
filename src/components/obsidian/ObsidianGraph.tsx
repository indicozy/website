import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import Graph from "graphology";
import gexf from "graphology-gexf";
import ForceSupervisor from "graphology-layout-force/worker";
import Sigma from "sigma";

const GraphClient = component$<{ text: string }>(({ text }) => {
  const container = useSignal<HTMLElement>();
  // const textSignal = useSignal<string>();

  const nav = useNavigate();
  // const status = useSignal<"success" | "error">();
  useVisibleTask$(async ({ track }) => {
    // track(() => graphText.value);
    track(() => container.value);
    const ref = container.value;
    console.log("cooking");
    if (ref !== undefined) {
      console.log("cooked");
      const graph = gexf.parse(Graph, text);

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
        nav(`/notes/${e.node}`);
        // Prevent sigma to move camera:
        e.preventSigmaDefault();
      });
    }
  });
  return <div ref={container} style={{ height: "600px" }} />;
});

export const ObsidianGraph = component$(() => {
  const graphText = useResource$<string>(async ({ cleanup }) => {
    const controller = new AbortController();
    const signal = controller.signal;
    cleanup(() => controller.abort());
    const data: string = await fetch(
      "https://raw.githubusercontent.com/indicozy/notes/master/nodes.gexf",
      { signal }
    ).then((res) => res.text());
    return data;
  });

  return (
    <Resource
      value={graphText}
      onPending={() => <div>Loading...</div>}
      onResolved={(text) => <GraphClient text={text} />}
    />
  );
});
