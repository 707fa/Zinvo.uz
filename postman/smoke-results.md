# flydubai UAT smoke results

Checked on 2026-04-30 Asia/Tashkent.

- Authenticate: `200`, token received.
- Route online: `200`, routes returned.
- Route interline: `200`, routes returned.
- Dry smoke with empty JSON body was run for the remaining generated endpoints to confirm they are reachable and authorized without creating or modifying a PNR.
- No generated endpoint returned `401`, `404`, or `405` in the dry smoke.
- Some endpoints returned expected validation/server responses with empty payloads, for example `400 Bad Request`, `500 Internal Server Error`, or `204 No Content`. These need valid fare IDs, PNR, passenger IDs, or cart/session values from the booking flow.
- `Fare Rules` returned `504 Gateway Time-out` for an empty-body dry smoke probe; retest with a real request payload from the collection.
