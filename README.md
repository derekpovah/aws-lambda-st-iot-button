# SmartThings AWS IoT Button Lambda

Take input from an AWS IoT button and send requests to the SmartThings API. Ideal for virtual buttons set up to execute Routines.

## Setup

1. Create a zip archive of index.js and node_packages or download this repository as a .zip
1. Log into the [AWS Lambda Console](https://console.aws.amazon.com/lambda) and create a new Function.
    * Author from scratch
    * Name: Whatever you want
    * Runtime: Node
    * Role: Create new role from template(s)
    * Role name: Whatever you want
    * Policy templates: AWS IoT Button permissions
1. Function code
    * Code entry type: Upload .ZIP file
1. Create a [Personal access token](https://account.smartthings.com/tokens) and get the device IDs you want to control from the [SmartThings API](https://smartthings.developer.samsung.com/develop/api-ref/st-api.html) and set up your environment variables
    * ST\_ACCESS\_TOKEN
    * SINGLE\_PRESS\_DEVICE\_ID
    * DOUBLE\_PRESS\_DEVICE\_ID
    * LONG\_PRESS\_DEVICE\_ID
1. Basic Settings
    * Timeout: 10 seconds
1. Designer
    * Add AWS IoT Trigger
    * IoT type: IoT Button
    * Device Serial Number: Your serial number
    * Enable triggers: Checked
1. Generate certificate and keys and follow device setup instructions
1. Click Save
