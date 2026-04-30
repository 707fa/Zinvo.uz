# flydubai UAT Postman

Files:

- `flydubai-offer-order.postman_collection.json` - collection for Offer Management and Order Management.
- `flydubai-uat.local.postman_environment.json` - local UAT environment with provided credentials. Keep this file private.

Run order:

1. Import both files into Postman.
2. Select the `flydubai UAT - MYSAFARAS local` environment.
3. Run `Auth / Authenticate` first. It stores `access_token` and `securityGUID`.
4. Run Offer requests first, then Order requests that depend on fare IDs, passenger IDs, or PNR values from earlier responses.

Generated endpoint coverage:

## Offer Management

- FareQuote
- Ancillary
- Route
- Interline Route
- Fare Rules
- Seat
- Repricer
- Multicity Availability
- Multicity FareQuote

## Order Management

- AddToCart
- SummaryPNR
- CommitPNR
- RetrievePNR
- Add Passenger
- Remove Passenger
- Update APIS
- Update Skywards Number
- Update Contact Details
- Email Booking Receipt
- Download Booking Receipt
- changeDateAndUpgrade
- Modify PNR
- Commit PNR - SaveReservation
- Cancel
- Void
- seatHold
- seatAssign
- CheckPNRStatus
