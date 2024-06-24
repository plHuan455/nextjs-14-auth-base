import { SortType } from "@kawaii/hime-connect/hime_pb"

import { himeClientService } from "services/grpc"

export function getActors() {
  return himeClientService.listAlbums({
    pageIndex: 0,
    pageSize: 12,
    sort: [
      {
        name: "created_at",
        type: SortType.DESC,
      },
    ],
  })
}
