import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import Graph from "graphology";
import gexf from "graphology-gexf";
import Sigma from "sigma";
import forceAtlas2 from "graphology-layout-force/worker";

export const ObsidianGraphClient = component$<{
  text: string;
  isInteractive: boolean;
}>(({ text, isInteractive }) => {
  const container = useSignal<HTMLElement>();
  const nav = useNavigate();
  // const location = useLocation();

  useVisibleTask$(async ({ track }) => {
    track(() => container.value);
    track(() => text);
    const ref = container.value;
    if (ref !== undefined) {
      console.log(text);
      const graph = gexf.parse(Graph, text);

      // Create the sigma
      const renderer = new Sigma(graph, ref);

      // push on double click
      renderer.on("doubleClickNode", (e) => {
        console.log(e.node);
        nav(`/notes/${e.node}`);
        // Prevent sigma to move camera:
        e.preventSigmaDefault();
      });

      if (isInteractive) {
        const lol = new forceAtlas2(graph);
        lol.start();

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
      }

      return () => {
        renderer.kill();
      };
    }
    return () => {};
  });
  return <div ref={container} style={{ height: "600px" }} />;
});
