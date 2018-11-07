import { Injectable } from '@angular/core';

@Injectable()
export class AvatarProvider {

  constructor() { }

  static avatar() {
    return 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgODUuMjU4IDg1LjI1OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgODUuMjU4IDg1LjI1ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJfeDMxXzNfMV8iPgoJCTxnPgoJCQk8cGF0aCBkPSJNNDguNzcxLDI4LjMzOFYyLjMwNWMwLTAuODUtMC42ODgtMi4zMDUtMS41MzYtMi4zMDVoLTkuMjE0Yy0wLjg1LDAtMS41MzYsMS40NTUtMS41MzYsMi4zMDV2MjUuOTkxICAgICBjLTQuNTQsMi4yMzQtNy42NzgsNi44OTYtNy42NzgsMTIuMjl2MzkuMDM5YzAsMy4xMDUsMi41MjUsNS42MzMsNS42MzEsNS42MzNoMTYuMzgxYzMuMTA0LDAsNS42MzEtMi41MjUsNS42MzEtNS42MzNWNDAuNTg2ICAgICBDNTYuNDUsMzUuMjI3LDUzLjM1MSwzMC41ODksNDguNzcxLDI4LjMzOHogTTM5LjU1NywzLjA3Mkg0NS43djMuMDcyaC02LjE0NFYzLjA3MnogTTM5LjU1Nyw5LjIxN0g0NS43djE4LjAzNCAgICAgYy0xLjAyNC0wLjIzMy0yLjA5MS0wLjM2OC0zLjE5My0wLjM2OGMtMS4wMTMsMC0xLjk5OCwwLjExOS0yLjk0OSwwLjMyOEwzOS41NTcsOS4yMTdMMzkuNTU3LDkuMjE3eiBNMzEuODc4LDQ5LjE1OGg0LjYwNiAgICAgdjIxLjUwNmgtNC42MDZWNDkuMTU4eiBNNTMuMzc4LDc5LjYyNWMwLDEuNDExLTEuMTQ4LDIuNTYxLTIuNTYxLDIuNTYxSDM0LjQzOGMtMS40MTEsMC0yLjU2LTEuMTQ4LTIuNTYtMi41NjF2LTUuODg5aDYuMTQzICAgICBjMC44NDksMCwxLjUzNSwwLjA4LDEuNTM1LTAuNzY5VjQ4LjM5MWMwLTAuODUxLTAuNjg3LTIuMzA2LTEuNTM1LTIuMzA2aC02LjE0M3YtNS40OTljMC01Ljg2MSw0Ljc2Ny0xMC42MzEsMTAuODcyLTEwLjYzMSAgICAgYzUuODU5LDAsMTAuNjI3LDQuNzcsMTAuNjI3LDEwLjYzMVY3OS42MjV6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';
  }

  static avatarGrande() {
    return 'data:image/png;base64,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';
  }
}
