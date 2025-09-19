import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { baseApi } from "../baseApi";
import { SAFETY_SCOPE_MAIN_MODULE } from "../tags";

// Types for Liveblocks data
interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { label: string };
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

interface LiveblocksResponse {
  nodes: Node[];
  edges: Edge[];
}

// Types for tree view data

// Projects API endpoints
export const safetyScopeMainModuleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch projects for a specific user
    fetchMainModuleInfo: builder.query<any, string>({
      queryFn: async (projectId) => {
        try {
          const projectRef = doc(db, "projects", projectId);
          const projectSnap = await getDoc(projectRef);
          if (!projectSnap.exists()) {
            return { data: null };
          }
          const data = projectSnap.data();
          // Ensure all data is properly serialized
          const serializedProject = {
            projectName: data.projectName || "",
            nodes: data.nodes || [],
            edges: data.edges || [],
          };

          return { data: serializedProject };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: String(error) } };
        }
      },
      providesTags: [SAFETY_SCOPE_MAIN_MODULE],
    }),
    fetchMainModuleNodesAndEdgesFromLiveblocks: builder.query<
      LiveblocksResponse,
      string
    >({
      queryFn: async (projectId) => {
        try {
          const response = await fetch(
            `/api/liveblocks-nodes-edges?projectId=${projectId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          return {
            data: {
              nodes: data.nodes || [],
              edges: data.edges || [],
            },
          };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: String(error) } };
        }
      },
      providesTags: [SAFETY_SCOPE_MAIN_MODULE],
    }),
    // Fetch specific node information from Liveblocks
    fetchNodeInfo: builder.query<any, { projectId: string; nodeId: string }>({
      queryFn: async ({ projectId, nodeId }) => {
        try {
          const response = await fetch(
            `/api/liveblocks-node-info?projectId=${projectId}&nodeId=${nodeId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            return {
              error: {
                status: "CUSTOM_ERROR",
                error: errorData.error || "Failed to fetch node info",
              },
            };
          }

          const data = await response.json();
          return { data };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: String(error) } };
        }
      },
    }),
    // Fetch tree view data from Liveblocks
    fetchTreeViewData: builder.query<any, string>({
      queryFn: async (projectId) => {
        try {
          const response = await fetch(
            `/api/liveblocks-nodes-edges-tree-view?projectId=${projectId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            return {
              error: {
                status: "CUSTOM_ERROR",
                error: errorData.error || "Failed to fetch tree view data",
              },
            };
          }

          const data = await response.json();
          return { data };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: String(error) } };
        }
      },
      providesTags: [SAFETY_SCOPE_MAIN_MODULE],
    }),
  }),
});

export const {
  useFetchMainModuleInfoQuery,
  useFetchMainModuleNodesAndEdgesFromLiveblocksQuery,
  useFetchNodeInfoQuery,
  useFetchTreeViewDataQuery,
} = safetyScopeMainModuleApi;
