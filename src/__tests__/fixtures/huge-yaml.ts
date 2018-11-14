export const HugeYAML = `swagger: '2.0'
info:
  version: '3.0'
  title: SendGrid v3 API Documentation
  description: |-
    # The SendGrid Web API V3 Documentation

    This is the entirety of the documented v3 endpoints. We have updated all the descriptions, parameters, requests, and responses.

    ## Authentication

    Every endpoint requires Authentication in the form of an Authorization Header:

    Authorization: Bearer API_KEY
host: api.sendgrid.com
basePath: /v3
schemes:
  - http
  - https
securityDefinitions:
  Authorization:
    name: Authorization
    type: apiKey
    in: header
paths:
  /mail/send:
    post:
      operationId: POST_mail-send
      summary: v3 Mail Send
      tags:
        - Mail Send
      description: |-
        This endpoint allows you to send email over SendGrid’s v3 Web API, the most recent version of our API. If you are looking for documentation about the v2 Mail Send endpoint, please see our [v2 API Reference](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).

        * Top level parameters are referred to as "global".
        * Individual fields within the personalizations array will override any other global, or “message level”, parameters that are defined outside of personalizations.

        **SendGrid provides libraries to help you quickly and easily integrate with the v3 Web API in 7 different languages: [C#](https://github.com/sendgrid/sendgrid-csharp), [Go](https://github.com/sendgrid/sendgrid-go), [Java](https://github.com/sendgrid/sendgrid-java), [Node JS](https://github.com/sendgrid/sendgrid-nodejs), [PHP](https://github.com/sendgrid/sendgrid-php), [Python](https://github.com/sendgrid/sendgrid-python), and [Ruby](https://github.com/sendgrid/sendgrid-ruby).**


        For more detailed information about how to use the v3 Mail Send endpoint, please visit our [Classroom](https://sendgrid.com/docs/Classroom/Send/v3_Mail_Send/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              personalizations:
                type: array
                description: An array of messages and their metadata. Each object within personalizations can be thought of as an envelope - it defines who should receive an individual message and how that message should be handled.
                uniqueItems: false
                maxItems: 1000
                items:
                  type: object
                  properties:
                    to:
                      type: array
                      description: 'An array of recipients. Each object within this array may contain the name, but must always contain the email, of a recipient.'
                      minItems: 1
                      maxItems: 1000
                      items:
                        $ref: '#/definitions/email_object'
                    cc:
                      type: array
                      description: 'An array of recipients who will receive a copy of your email. Each object within this array may contain the name, but must always contain the email, of a recipient.'
                      maxItems: 1000
                      items:
                        $ref: '#/definitions/email_object'
                    bcc:
                      type: array
                      description: 'An array of recipients who will receive a blind carbon copy of your email. Each object within this array may contain the name, but must always contain the email, of a recipient.'
                      maxItems: 1000
                      items:
                        $ref: '#/definitions/email_object'
                    subject:
                      type: string
                      description: 'The subject of your email. Char length requirements, according to the RFC - http://stackoverflow.com/questions/1592291/what-is-the-email-subject-length-limit#answer-1592310'
                      minLength: 1
                    headers:
                      type: object
                      description: 'A collection of JSON key/value pairs allowing you to specify specific handling instructions for your email. You may not overwrite the following headers: x-sg-id, x-sg-eid, received, dkim-signature, Content-Type, Content-Transfer-Encoding, To, From, Subject, Reply-To, CC, BCC'
                    substitutions:
                      type: object
                      description: 'A collection of key/value pairs following the pattern "substitution_tag":"value to substitute". All are assumed to be strings. These substitutions will apply to the text and html content of the body of your email, in addition to the \`subject\` and \`reply-to\` parameters.'
                      maxProperties: 10000
                    custom_args:
                      type: object
                      description: 'Values that are specific to this personalization that will be carried along with the email and its activity data. Substitutions will not be made on custom arguments, so any string that is entered into this parameter will be assumed to be the custom argument that you would like to be used. May not exceed 10,000 bytes.'
                    send_at:
                      type: integer
                      description: A unix timestamp allowing you to specify when you want your email to be delivered. Scheduling more than 72 hours in advance is forbidden.
                  required:
                    - to
              from:
                $ref: '#/definitions/email_object'
              reply_to:
                $ref: '#/definitions/email_object'
              subject:
                type: string
                description: 'The global, or “message level”, subject of your email. This may be overridden by personalizations[x].subject.'
                minLength: 1
              content:
                type: array
                description: 'An array in which you may specify the content of your email. You can include multiple mime types of content, but you must specify at least one mime type. To include more than one mime type, simply add another object to the array containing the \`type\` and \`value\` parameters.'
                items:
                  type: object
                  properties:
                    type:
                      type: string
                      description: 'The mime type of the content you are including in your email. For example, “text/plain” or “text/html”.'
                      minLength: 1
                    value:
                      type: string
                      description: The actual content of the specified mime type that you are including in your email.
                      minLength: 1
                  required:
                    - type
                    - value
              attachments:
                type: array
                description: An array of objects in which you can specify any attachments you want to include.
                items:
                  type: object
                  properties:
                    content:
                      type: string
                      description: The Base64 encoded content of the attachment.
                      minLength: 1
                    type:
                      type: string
                      description: 'The mime type of the content you are attaching. For example, “text/plain” or “text/html”.'
                      minLength: 1
                    filename:
                      type: string
                      description: The filename of the attachment.
                    disposition:
                      type: string
                      default: attachment
                      description: 'The content-disposition of the attachment specifying how you would like the attachment to be displayed. For example, “inline” results in the attached file being displayed automatically within the message while “attachment” results in the attached file requiring some action to be taken before it is displayed (e.g. opening or downloading the file).'
                      enum:
                        - inline
                        - attachment
                    content_id:
                      type: string
                      description: 'The content id for the attachment. This is used when the disposition is set to “inline” and the attachment is an image, allowing the file to be displayed within the body of your email.'
                  required:
                    - content
                    - filename
              template_id:
                type: string
                description: 'The id of a template that you would like to use. If you use a template that contains a subject and content (either text or html), you do not need to specify those at the personalizations nor message level. '
              sections:
                type: object
                description: An object of key/value pairs that define block sections of code to be used as substitutions.
              headers:
                type: object
                description: An object containing key/value pairs of header names and the value to substitute for them. You must ensure these are properly encoded if they contain unicode characters. Must not be one of the reserved headers.
              categories:
                type: array
                description: 'An array of category names for this message. Each category name may not exceed 255 characters. '
                uniqueItems: true
                maxItems: 10
                items:
                  type: string
                  maxLength: 255
              custom_args:
                type: object
                description: 'Values that are specific to the entire send that will be carried along with the email and its activity data. Substitutions will not be made on custom arguments, so any string that is entered into this parameter will be assumed to be the custom argument that you would like to be used. This parameter is overridden by personalizations[x].custom_args if that parameter has been defined. Total custom args size may not exceed 10,000 bytes.'
              send_at:
                type: integer
                description: 'A unix timestamp allowing you to specify when you want your email to be delivered. This may be overridden by the personalizations[x].send_at parameter. Scheduling more ta 72 hours in advance is forbidden.'
              batch_id:
                type: string
                description: 'This ID represents a batch of emails to be sent at the same time. Including a batch_id in your request allows you include this email in that batch, and also enables you to cancel or pause the delivery of that batch. For more information, see https://sendgrid.com/docs/API_Reference/Web_API_v3/cancel_schedule_send.html '
              asm:
                type: object
                description: An object allowing you to specify how to handle unsubscribes.
                properties:
                  group_id:
                    type: integer
                    description: The unsubscribe group to associate with this email.
                  groups_to_display:
                    type: array
                    description: An array containing the unsubscribe groups that you would like to be displayed on the unsubscribe preferences page.
                    maxItems: 25
                    items:
                      type: integer
                required:
                  - group_id
              ip_pool_name:
                type: string
                description: The IP Pool that you would like to send this email from.
                minLength: 2
                maxLength: 64
              mail_settings:
                type: object
                description: A collection of different mail settings that you can use to specify how you would like this email to be handled.
                properties:
                  bcc:
                    type: object
                    description: This allows you to have a blind carbon copy automatically sent to the specified email address for every email that is sent.
                    properties:
                      enable:
                        type: boolean
                        description: Indicates if this setting is enabled.
                      email:
                        type: string
                        description: The email address that you would like to receive the BCC.
                        format: email
                  bypass_list_management:
                    type: object
                    description: Allows you to bypass all unsubscribe groups and suppressions to ensure that the email is delivered to every single recipient. This should only be used in emergencies when it is absolutely necessary that every recipient receives your email.
                    properties:
                      enable:
                        type: boolean
                        description: Indicates if this setting is enabled.
                  footer:
                    type: object
                    description: The default footer that you would like included on every email.
                    properties:
                      enable:
                        type: boolean
                        description: Indicates if this setting is enabled.
                      text:
                        type: string
                        description: The plain text content of your footer.
                      html:
                        type: string
                        description: The HTML content of your footer.
                  sandbox_mode:
                    type: object
                    description: This allows you to send a test email to ensure that your request body is valid and formatted correctly.
                    properties:
                      enable:
                        type: boolean
                        description: Indicates if this setting is enabled.
                  spam_check:
                    type: object
                    description: This allows you to test the content of your email for spam.
                    properties:
                      enable:
                        type: boolean
                        description: Indicates if this setting is enabled.
                      threshold:
                        type: integer
                        description: 'The threshold used to determine if your content qualifies as spam on a scale from 1 to 10, with 10 being most strict, or most likely to be considered as spam.'
                        minimum: 1
                        maximum: 10
                      post_to_url:
                        type: string
                        description: An Inbound Parse URL that you would like a copy of your email along with the spam report to be sent to.
              tracking_settings:
                type: object
                description: Settings to determine how you would like to track the metrics of how your recipients interact with your email.
                properties:
                  click_tracking:
                    type: object
                    description: Allows you to track whether a recipient clicked a link in your email.
                    properties:
                      enable:
                        type: boolean
                        description: Indicates if this setting is enabled.
                      enable_text:
                        type: boolean
                        description: Indicates if this setting should be included in the text/plain portion of your email.
                  open_tracking:
                    type: object
                    description: 'Allows you to track whether the email was opened or not, but including a single pixel image in the body of the content. When the pixel is loaded, we can log that the email was opened.'
                    properties:
                      enable:
                        type: boolean
                        description: Indicates if this setting is enabled.
                      substitution_tag:
                        type: string
                        description: Allows you to specify a substitution tag that you can insert in the body of your email at a location that you desire. This tag will be replaced by the open tracking pixel.
                  subscription_tracking:
                    type: object
                    description: 'Allows you to insert a subscription management link at the bottom of the text and html bodies of your email. If you would like to specify the location of the link within your email, you may use the substitution_tag.'
                    properties:
                      enable:
                        type: boolean
                        description: Indicates if this setting is enabled.
                      text:
                        type: string
                        description: 'Text to be appended to the email, with the subscription tracking link. You may control where the link is by using the tag <% %>'
                      html:
                        type: string
                        description: 'HTML to be appended to the email, with the subscription tracking link. You may control where the link is by using the tag <% %>'
                      substitution_tag:
                        type: string
                        description: 'A tag that will be replaced with the unsubscribe URL. for example: [unsubscribe_url]. If this parameter is used, it will override both the \`text\` and \`html\` parameters. The URL of the link will be placed at the substitution tag’s location, with no additional formatting.'
                  ganalytics:
                    type: object
                    description: Allows you to enable tracking provided by Google Analytics.
                    properties:
                      enable:
                        type: boolean
                        description: Indicates if this setting is enabled.
                      utm_source:
                        type: string
                        description: 'Name of the referrer source. (e.g. Google, SomeDomain.com, or Marketing Email)'
                      utm_medium:
                        type: string
                        description: Name of the marketing medium. (e.g. Email)
                      utm_term:
                        type: string
                        description: "Used to identify any paid keywords.\t"
                      utm_content:
                        type: string
                        description: "Used to differentiate your campaign from advertisements.\t"
                      utm_campaign:
                        type: string
                        description: "The name of the campaign.\t"
            required:
              - personalizations
              - from
              - subject
              - content
            example:
              personalizations:
                - to:
                    - email: john.doe@example.com
                      name: John Doe
                  subject: 'Hello, World!'
              from:
                email: sam.smith@example.com
                name: Sam Smith
              reply_to:
                email: sam.smith@example.com
                name: Sam Smith
              subject: 'Hello, World!'
              content:
                - type: text/html
                  value: '<html><p>Hello, world!</p></html>'
      responses:
        '202':
          description: ''
          schema:
            type: 'null'
        '400':
          description: ''
          schema:
            $ref: '#/definitions/errors'
        '401':
          description: ''
          schema:
            $ref: '#/definitions/errors'
        '413':
          description: ''
          schema:
            $ref: '#/definitions/errors'
      security:
        - Authorization: []
  /alerts:
    post:
      operationId: POST_alerts
      summary: Create a new Alert
      tags:
        - Alerts
      description: |-
        **This endpoint allows you to create a new alert.**

        Alerts allow you to specify an email address to receive notifications regarding your email usage or statistics. There are two types of alerts that can be created with this endpoint:

        * \`usage_limit\` allows you to set the threshold at which an alert will be sent.
        * \`stats_notification\` allows you to set how frequently you would like to receive email statistics reports. For example, "daily", "weekly", or "monthly".

        For more information about alerts, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/alerts.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              type:
                type: string
                description: |-
                  The type of alert you want to create. Can be either usage_limit or stats_notification.
                  Example: usage_limit
                enum:
                  - stats_notification
                  - usage_limit
              email_to:
                type:
                  - string
                  - 'null'
                description: |-
                  The email address the alert will be sent to.
                  Example: test@example.com
              frequency:
                type: string
                description: |-
                  Required for stats_notification. How frequently the alert will be sent.
                  Example: daily
              percentage:
                type: integer
                description: |-
                  Required for usage_alert. When this usage threshold is reached, the alert will be sent.
                  Example: 90
            required:
              - type
              - email_to
            example:
              type: stats_notification
              email_to: example@example.com
              frequency: daily
        - name: Authorization
          in: header
          type: string
        - name: on-behalf-of
          in: header
          type: string
      responses:
        '201':
          description: ''
          schema:
            type: object
            properties:
              created_at:
                type: integer
                description: A Unix timestamp indicating when the alert was created.
              email_to:
                type: string
                description: The email address that the alert will be sent to.
              frequency:
                type: string
                description: 'If the alert is of type stats_notification, this indicates how frequently the stats notifications will be sent. For example, "daily", "weekly", or "monthly".'
              id:
                type: integer
                description: The ID of the alert.
              type:
                type: string
                description: The type of alert.
              updated_at:
                type: integer
                description: A Unix timestamp indicating when the alert was last modified.
              percentage:
                type: integer
                description: '"If the alert is of type usage_limit, this indicates the percentage of email usage that must be reached before the alert will be sent.'
            required:
              - created_at
              - email_to
              - id
              - type
              - updated_at
          examples:
            application/json:
              created_at: 1451520930
              email_to: test@example.com
              frequency: daily
              id: 48
              type: stats_notification
              updated_at: 1451520930
        '400':
          description: ''
          schema:
            type: object
            properties:
              field:
                type: string
              message:
                type: string
      security:
        - Authorization: []
    get:
      operationId: GET_alerts
      summary: Retrieve all alerts
      tags:
        - Alerts
      description: |-
        **This endpoint allows you to retieve all of your alerts.**

        Alerts allow you to specify an email address to receive notifications regarding your email usage or statistics.
        * Usage alerts allow you to set the threshold at which an alert will be sent.
        * Stats notifications allow you to set how frequently you would like to receive email statistics reports. For example, "daily", "weekly", or "monthly".

        For more information about alerts, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/alerts.html).
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - name: Authorization
          in: header
          type: string
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            description: The list of alerts.
            items:
              type: object
              properties:
                created_at:
                  type: integer
                  description: A Unix timestamp indicating when the alert was created.
                email_to:
                  type: string
                  description: The email address that the alert will be sent to.
                id:
                  type: integer
                  description: The ID of the alert.
                percentage:
                  type: integer
                  description: 'If the alert is of type usage_limit, this indicates the percentage of email usage that must be reached before the alert will be sent.'
                type:
                  type: string
                  description: The type of alert.
                  enum:
                    - usage_limit
                    - stats_notification
                updated_at:
                  type: integer
                  description: A Unix timestamp indicating when the alert was last modified.
                frequency:
                  type: string
                  description: 'If the alert is of type stats_notification, this indicates how frequently the stats notifications will be sent. For example, "daily", "weekly", or "monthly".'
              required:
                - created_at
                - email_to
                - id
                - type
          examples:
            application/json:
              - created_at: 1451498784
                email_to: example1@example.com
                id: 46
                percentage: 90
                type: usage_limit
                updated_at: 1451498784
              - created_at: 1451498812
                email_to: example2@example.com
                frequency: monthly
                id: 47
                type: stats_notification
                updated_at: 1451498812
              - created_at: 1451520930
                email_to: example3@example.com
                frequency: daily
                id: 48
                type: stats_notification
                updated_at: 1451520930
      security:
        - Authorization: []
  '/alerts/{alert_id}':
    parameters:
      - name: alert_id
        in: path
        description: The ID of the alert you would like to retrieve.
        required: true
        type: integer
    get:
      operationId: GET_alerts-alert_id
      summary: Retrieve a specific alert
      tags:
        - Alerts
      description: |-
        **This endpoint allows you to retrieve a specific alert.**

        Alerts allow you to specify an email address to receive notifications regarding your email usage or statistics.
        * Usage alerts allow you to set the threshold at which an alert will be sent.
        * Stats notifications allow you to set how frequently you would like to receive email statistics reports. For example, "daily", "weekly", or "monthly".

        For more information about alerts, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/alerts.html).
      produces:
        - application/json
      parameters:
        - name: Authorization
          in: header
          type: string
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              created_at:
                type: integer
                description: A Unix timestamp indicating when the alert was created.
              email_to:
                type: string
                description: The email address that the alert will be sent to.
              frequency:
                type: string
                description: 'If the alert is of type stats_notification, this indicates how frequently the stats notifications will be sent. For example: "daily", "weekly", or "monthly".'
              id:
                type: integer
                description: The ID of the alert.
              type:
                type: string
                description: The type of alert.
                enum:
                  - usage_alert
                  - stats_notification
              updated_at:
                type: integer
                description: A Unix timestamp indicating when the alert was last modified.
              percentage:
                type: integer
                description: 'If the alert is of type usage_limit, this indicates the percentage of email usage that must be reached before the alert will be sent.'
            required:
              - created_at
              - email_to
              - id
              - type
              - updated_at
          examples:
            application/json:
              created_at: 1451520930
              email_to: example@example.com
              frequency: daily
              id: 48
              type: stats_notification
              updated_at: 1451520930
      security:
        - Authorization: []
    delete:
      operationId: DELETE_alerts-alert_id
      summary: Delete an alert
      tags:
        - Alerts
      description: |-
        **This endpoint allows you to delete an alert.**

        Alerts allow you to specify an email address to receive notifications regarding your email usage or statistics.
        * Usage alerts allow you to set the threshold at which an alert will be sent.
        * Stats notifications allow you to set how frequently you would like to receive email statistics reports. For example, "daily", "weekly", or "monthly".

        For more information about alerts, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/alerts.html).
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
      security:
        - Authorization: []
    patch:
      operationId: PATCH_alerts-alert_id
      summary: Update an alert
      tags:
        - Alerts
      description: |-
        **This endpoint allows you to update an alert.**

        Alerts allow you to specify an email address to receive notifications regarding your email usage or statistics.
        * Usage alerts allow you to set the threshold at which an alert will be sent.
        * Stats notifications allow you to set how frequently you would like to receive email statistics reports. For example, "daily", "weekly", or "monthly".

        For more information about alerts, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/alerts.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              email_to:
                type: string
                description: |-
                  The new email address you want your alert to be sent to.
                  Example: test@example.com
              frequency:
                type: string
                description: |-
                  The new frequency at which to send the stats_notification alert.
                  Example: monthly
              percentage:
                type: integer
                description: |-
                  The new percentage threshold at which the usage_limit alert will be sent.
                  Example: 90
            example:
              email_to: example@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              created_at:
                type: integer
                description: A Unix timestamp indicating when the alert was created.
              email_to:
                type: string
                description: The email address that the alert will be sent to.
              frequency:
                type: string
                description: 'If the alert is of type stats_notification, this indicates how frequently the stats notifications will be sent. For example: "daily", "weekly", or "monthly".'
              id:
                type: integer
                description: The ID of the alert.
              type:
                type: string
                description: The type of alert.
                enum:
                  - usage_alert
                  - stats_notification
              updated_at:
                type: integer
                description: A Unix timestamp indicating when the alert was last modified.
              percentage:
                type: integer
                description: 'If the alert is of type usage_limit, this indicates the percentage of email usage that must be reached before the alert will be sent.'
            required:
              - created_at
              - email_to
              - id
              - type
              - updated_at
          examples:
            application/json:
              created_at: 1451520930
              email_to: example@example.com
              frequency: daily
              id: 48
              type: stats_notification
              updated_at: 1451522691
      security:
        - Authorization: []
  /api_keys:
    get:
      operationId: GET_api_keys
      summary: Retrieve all API Keys belonging to the authenticated user
      tags:
        - API Keys
      description: |-
        **This endpoint allows you to retrieve all API Keys that belong to the authenticated user.**

        The API Keys feature allows customers to be able to generate an API Key credential which can be used for authentication with the SendGrid v3 Web API or the [Mail API Endpoint](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                items:
                  $ref: '#/definitions/api_key_name_id'
          examples:
            application/json:
              result:
                - name: API Key Name
                  api_key_id: some-apikey-id
                - name: API Key Name 2
                  api_key_id: another-apikey-id
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    post:
      operationId: create-api-keys
      summary: Create API keys
      tags:
        - API Keys
      description: |-
        **This endpoint allows you to create a new random API Key for the user.**

        A JSON request body containing a "name" property is required. If number of maximum keys is reached, HTTP 403 will be returned.

        There is a limit of 100 API Keys on your account.

        The API Keys feature allows customers to be able to generate an API Key credential which can be used for authentication with the SendGrid v3 Web API or the [Mail API Endpoint](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).

        See the [API Key Permissions List](https://sendgrid.com/docs/API_Reference/Web_API_v3/API_Keys/api_key_permissions_list.html) for a list of all available scopes.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              name:
                type: string
                description: The name you will use to describe this API Key.
              scopes:
                type: array
                description: The individual permissions that you are giving to this API Key.
                items:
                  type: string
              sample:
                type: string
            required:
              - name
            example:
              name: My API Key
              scopes:
                - mail.send
                - alerts.create
                - alerts.read
              sample: data
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            type: object
            properties:
              api_key:
                type: string
              api_key_id:
                type: string
              name:
                type: string
              scopes:
                type: array
                items:
                  type: string
          examples:
            application/json:
              api_key: SG.xxxxxxxx.yyyyyyyy
              api_key_id: xxxxxxxx
              name: My API Key
              scopes:
                - mail.send
                - alerts.create
                - alerts.read
        '400':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: name
                  message: missing required argument
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '403':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: Cannot create more than 100 API Keys
      security:
        - Authorization: []
  '/api_keys/{api_key_id}':
    parameters:
      - name: api_key_id
        in: path
        description: The ID of the API Key for which you are requesting information.
        required: true
        type: string
    get:
      operationId: GET_api_keys-api_key_id
      summary: Retrieve an existing API Key
      tags:
        - API Keys
      description: |-
        **This endpoint allows you to retrieve a single api key.**

        If the API Key ID does not exist an HTTP 404 will be returned.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                items:
                  $ref: '#/definitions/api_key_name_id_scopes'
          examples:
            application/json:
              result:
                - name: API Key Name
                  api_key_id: some-apikey-id
                - name: API Key Name 2
                  api_key_id: another-apikey-id
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: Unexpected error in API call. See HTTP response body for details.
          schema:
            type: object
          examples:
            application/json:
              errors:
                - field: null
                  message: unable to find API Key
      security:
        - Authorization: []
    delete:
      operationId: DELETE_api_keys-api_key_id
      summary: Delete API keys
      tags:
        - API Keys
      description: |-
        **This endpoint allows you to revoke an existing API Key**

        Authentications using this API Key will fail after this request is made, with some small propogation delay.If the API Key ID does not exist an HTTP 404 will be returned.

        The API Keys feature allows customers to be able to generate an API Key credential which can be used for authentication with the SendGrid v3 Web API or the [Mail API Endpoint](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).

        ## URI Parameters

        | URI Parameter   | Type  | Required?  | Description  |
        |---|---|---|---|
        |api_key_id |string | required | The ID of the API Key you are deleting.|
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: 'null'
          examples:
            application/json: null
        '404':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: unable to find API Key
      security:
        - Authorization: []
    patch:
      operationId: PATCH_api_keys-api_key_id
      summary: Update API keys
      tags:
        - API Keys
      description: |-
        **This endpoint allows you to update the name of an existing API Key.**

        A JSON request body with a "name" property is required.

        The API Keys feature allows customers to be able to generate an API Key credential which can be used for authentication with the SendGrid v3 Web API or the [Mail API Endpoint](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).

        ## URI Parameters

        | URI Parameter   | Type  | Required?  | Description  |
        |---|---|---|---|
        |api_key_id |string | required | The ID of the API Key you are updating.|
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              name:
                type: string
                description: The new name of the API Key.
            example:
              name: A New Hope
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/api_key_name_id'
          examples:
            application/json:
              api_key_id: qfTQ6KG0QBiwWdJ0-pCLCA
              name: A New Hope
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    put:
      operationId: PUT_api_keys-api_key_id
      summary: Update the name & scopes of an API Key
      tags:
        - API Keys
      description: |-
        **This endpoint allows you to update the name and scopes of a given API key.**

        A JSON request body with a "name" property is required.
        Most provide the list of all the scopes an api key should have.

        The API Keys feature allows customers to be able to generate an API Key credential which can be used for authentication with the SendGrid v3 Web API or the [Mail API Endpoint](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              name:
                type: string
              scopes:
                type: array
                items:
                  type: string
            example:
              name: A New Hope
              scopes:
                - user.profile.read
                - user.profile.update
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/api_key_name_id_scopes'
          examples:
            application/json:
              api_key_id: qfTQ6KG0QBiwWdJ0-pCLCA
              name: A New Hope
              scopes:
                - user.profile.read
                - user.profile.update
        '400':
          description: Unexpected error in API call. See HTTP response body for details.
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: expected JSON request body with 'name' property
        '401':
          description: ''
          schema:
            type: object
        '404':
          description: Unexpected error in API call. See HTTP response body for details.
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: unable to find API Key to update
      security:
        - Authorization: []
  /suppression/blocks:
    get:
      operationId: GET_suppression-blocks
      summary: Retrieve all blocks
      tags:
        - Blocks API
      description: |-
        **This endpoint allows you to retrieve a list of all email addresses that are currently on your blocks list.**

        There are several causes for [blocked](https://sendgrid.com/docs/Glossary/blocks.html) emails: for example, your mail server IP address is on an ISP blacklist, or blocked by an ISP, or if the receiving server flags the message content.

        For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/blocks.html).
      produces:
        - application/json
      parameters:
        - name: start_time
          in: query
          description: Refers start of the time range in unix timestamp when a blocked email was created (inclusive).
          type: integer
        - name: end_time
          in: query
          description: Refers end of the time range in unix timestamp when a blocked email was created (inclusive).
          type: integer
        - name: limit
          in: query
          description: Limit the number of results to be displayed per page.
          type: integer
        - name: offset
          in: query
          description: The point in the list to begin displaying results.
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                created:
                  type: integer
                  description: A Unix timestamp indicating when the email address was added to the blocks list.
                email:
                  type: string
                  description: The email address that was added to the block list.
                reason:
                  type: string
                  description: An explanation for the reason of the block.
                status:
                  type: string
                  description: The status of the block.
              required:
                - created
                - email
                - reason
                - status
          examples:
            application/json:
              - created: 1443651154
                email: example@example.com
                reason: 'error dialing remote address: dial tcp 10.57.152.165:25: no route to host'
                status: 4.0.0
      security:
        - Authorization: []
    delete:
      operationId: DELETE_suppression-blocks
      summary: Delete blocks
      tags:
        - Blocks API
      description: |-
        **This endpoint allows you to delete all email addresses on your blocks list.**

        There are two options for deleting blocked emails:

        1. You can delete all blocked emails by setting \`delete_all\` to true in the request body.
        2. You can delete some blocked emails by specifying the email addresses in an array in the request body.

        [Blocks](https://sendgrid.com/docs/Glossary/blocks.html) happen when your message was rejected for a reason related to the message, not the recipient address. This can happen when your mail server IP address has been added to a blacklist or blocked by an ISP, or if the message content is flagged by a filter on the receiving server.

        For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/blocks.html).
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              delete_all:
                type: boolean
                description: Indicates if you want to delete all blocked email addresses.
              emails:
                type: array
                description: The specific blocked email addresses that you want to delete.
                items:
                  type: string
            example:
              delete_all: false
              emails:
                - example1@example.com
                - example2@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
      security:
        - Authorization: []
  '/suppression/blocks/{email}':
    parameters:
      - name: email
        in: path
        description: The email address of the specific block.
        required: true
        type: string
    get:
      operationId: GET_suppression-blocks-email
      summary: Retrieve a specific block
      tags:
        - Blocks API
      description: |-
        **This endpoint allows you to retrieve a specific email address from your blocks list.**

        [Blocks](https://sendgrid.com/docs/Glossary/blocks.html) happen when your message was rejected for a reason related to the message, not the recipient address. This can happen when your mail server IP address has been added to a blacklist or blocked by an ISP, or if the message content is flagged by a filter on the receiving server.

        For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/blocks.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                created:
                  type: integer
                  description: A Unix timestamp indicating when the block was created.
                email:
                  type: string
                  description: The email address of the recipient that was blocked.
                reason:
                  type: string
                  description: The reason why the email was blocked.
                status:
                  type: string
                  description: The status of the block.
              required:
                - created
                - email
                - reason
          examples:
            application/json:
              - created: 1443651154
                email: example@example.com
                reason: 'error dialing remote address: dial tcp 10.57.152.165:25: no route to host'
                status: 4.0.0
      security:
        - Authorization: []
    delete:
      operationId: DELETE_suppression-blocks-email
      summary: Delete a specific block
      tags:
        - Blocks API
      description: |-
        **This endpoint allows you to delete a specific email address from your blocks list.**

        [Blocks](https://sendgrid.com/docs/Glossary/blocks.html) happen when your message was rejected for a reason related to the message, not the recipient address. This can happen when your mail server IP address has been added to a blacklist or blocked by an ISP, or if the message content is flagged by a filter on the receiving server.

        For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/blocks.html).
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:authorizationHeader:Authorization'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
  /scopes:
    get:
      operationId: GET_scopes
      summary: Retrieve a list of scopes for which this user has access.
      tags:
        - API Key Permissions
      description: |-
        **This endpoint returns a list of all scopes that this user has access to.**

        API Keys can be used to authenticate the use of [SendGrid’s v3 Web API](https://sendgrid.com/docs/API_Reference/Web_API_v3/index.html), or the [Mail API Endpoint](https://sendgrid.com/docs/API_Reference/Web_API/mail.html). API Keys may be assigned certain permissions, or scopes, that limit which API endpoints they are able to access. For a more detailed explanation of how you can use API Key permissios, please visit our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/api_keys.html#-API-Key-Permissions) or [Classroom](https://sendgrid.com/docs/Classroom/Basics/API/api_key_permissions.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              scopes:
                type: array
                description: The list of scopes for which this user has access.
                uniqueItems: true
                items:
                  type: string
            required:
              - scopes
          examples:
            application/json:
              scopes:
                - mail.send
                - alerts.create
                - alerts.read
        '401':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                description: This 401 response indicates that the user making the call doesn't have the authorization to view the list of scopes.
                items:
                  type: object
                  properties:
                    field:
                      type: 'null'
                      description: This empty field is returned instead of the list of scopes if the user making the call doesn't have the authorization required.
                    message:
                      type: string
                      description: Explains why the scopes cannot be returned.
                  required:
                    - message
            required:
              - errors
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  /suppression/bounces:
    get:
      operationId: GET_suppression-bounces
      summary: Retrieve all bounces
      tags:
        - Bounces API
      description: |-
        **This endpoint allows you to retrieve all of your bounces.**

        A bounced email is when the message is undeliverable and then returned to the server that sent it.

        For more information see:

        * [User Guide > Bounces](https://sendgrid.com/docs/User_Guide/Suppressions/bounces.html) for more information
        * [Glossary > Bounces](https://sendgrid.com/docs/Glossary/Bounces.html)
      produces:
        - application/json
      parameters:
        - name: start_time
          in: query
          description: Refers start of the time range in unix timestamp when a bounce was created (inclusive).
          type: integer
        - name: end_time
          in: query
          description: Refers end of the time range in unix timestamp when a bounce was created (inclusive).
          type: integer
        - name: Accept
          in: header
          required: true
          type: string
          default: application/json
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                created:
                  type: number
                email:
                  type: string
                reason:
                  type: string
                status:
                  type: string
          examples:
            application/json:
              - created: 1250337600
                email: example@example.com
                reason: '550 5.1.1 The email account that you tried to reach does not exist. Please try double-checking the recipient''s email address for typos or unnecessary spaces. Learn more at  https://support.google.com/mail/answer/6596 o186si2389584ioe.63 - gsmtp '
                status: 5.1.1
              - created: 1250337600
                email: example@example.com
                reason: '550 5.1.1 <testemail2@testing.com>: Recipient address rejected: User unknown in virtual alias table '
                status: 5.1.1
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    delete:
      operationId: DELETE_suppression-bounces
      summary: Delete bounces
      tags:
        - Bounces API
      description: |-
        **This endpoint allows you to delete all of your bounces. You can also use this endpoint to remove a specific email address from your bounce list.**

        A bounced email is when the message is undeliverable and then returned to the server that sent it.

        For more information see:

        * [User Guide > Bounces](https://sendgrid.com/docs/User_Guide/Suppressions/bounces.html) for more information
        * [Glossary > Bounces](https://sendgrid.com/docs/Glossary/Bounces.html)
        * [Classroom > List Scrubbing Guide](https://sendgrid.com/docs/Classroom/Deliver/list_scrubbing.html)

        Note: the \`delete_all\` and \`emails\` parameters should be used independently of each other as they have different purposes.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              delete_all:
                type: boolean
                description: This parameter allows you to delete **every** email in your bounce list. This should not be used with the emails parameter.
              emails:
                type: array
                description: Delete multiple emails from your bounce list at the same time. This should not be used with the delete_all parameter.
                items:
                  type: string
            example:
              delete_all: true
              emails:
                - example@example.com
                - example2@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: 'null'
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  '/suppression/bounces/{email}':
    parameters:
      - name: email
        in: path
        required: true
        type: string
    get:
      operationId: GET_suppression-bounces-email
      summary: Retrieve a Bounce
      tags:
        - Bounces API
      description: |-
        **This endpoint allows you to retrieve a specific bounce for a given email address.**

        A bounced email is when the message is undeliverable and then returned to the server that sent it.

        For more information see:

        * [User Guide > Bounces](https://sendgrid.com/docs/User_Guide/Suppressions/bounces.html) for more information
        * [Glossary > Bounces](https://sendgrid.com/docs/Glossary/Bounces.html)
        * [Classroom > List Scrubbing Guide](https://sendgrid.com/docs/Classroom/Deliver/list_scrubbing.html)
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                created:
                  type: integer
                email:
                  type: string
                reason:
                  type: string
                status:
                  type: string
          examples:
            application/json:
              - created: 1443651125
                email: bounce1@test.com
                reason: '550 5.1.1 The email account that you tried to reach does not exist. Please try double-checking the recipient''s email address for typos or unnecessary spaces. Learn more at  https://support.google.com/mail/answer/6596 o186si2389584ioe.63 - gsmtp '
                status: 5.1.1
      security:
        - Authorization: []
    delete:
      operationId: DELETE_suppression-bounces-email
      summary: Delete a bounce
      tags:
        - Bounces API
      description: |-
        **This endpoint allows you to remove an email address from your bounce list.**

        A bounced email is when the message is undeliverable and then returned to the server that sent it. This endpoint allows you to delete a single email addresses from your bounce list.

        For more information see:

        * [User Guide > Bounces](https://sendgrid.com/docs/User_Guide/Suppressions/bounces.html) for more information
        * [Glossary > Bounces](https://sendgrid.com/docs/Glossary/Bounces.html)
        * [Classroom > List Scrubbing Guide](https://sendgrid.com/docs/Classroom/Deliver/list_scrubbing.html)
      produces:
        - application/json
      parameters:
        - name: email_address
          in: query
          description: The email address you would like to remove from the bounce list.
          required: true
          type: string
          format: email
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  /campaigns:
    post:
      operationId: POST_campaigns
      summary: Create a Campaign
      tags:
        - Campaigns API
      description: |-
        **This endpoint allows you to create a campaign.**

        Our Marketing Campaigns API lets you create, manage, send, and schedule campaigns.

        Note: In order to send or schedule the campaign, you will be required to provide a subject, sender ID, content (we suggest both html and plain text), and at least one list or segment ID. This information is not required when you create a campaign.

        For more information:

        * [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/campaign_request'
            example:
              title: March Newsletter
              subject: New Products for Spring!
              sender_id: 124451
              list_ids:
                - 110
                - 124
              segment_ids:
                - 110
              categories:
                - spring line
              suppression_group_id: 42
              custom_unsubscribe_url: ''
              ip_pool: marketing
              html_content: <html><head><title></title></head><body><p>Check out our spring line!</p></body></html>
              plain_content: Check out our spring line!
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/campaign_response'
          examples:
            application/json:
              id: 986724
              title: March Newsletter
              subject: New Products for Spring!
              sender_id: 124451
              list_ids:
                - 110
                - 124
              segment_ids:
                - 110
              categories:
                - spring line
              suppression_group_id: 42
              custom_unsubscribe_url: ''
              ip_pool: marketing
              html_content: <html><head><title></title></head><body><p>Check out our spring line!</p></body></html>
              plain_content: Check out our spring line!
              status: Draft
        '400':
          description: |-
            "title": "title can't be blank"
            "title": "title is too long (maximum is 100 characters)"
            "categories": "categories exceeds 10 category limit"
            "html_content": "html_content exceeds the 1MB limit"
            "plain_content": "plain_content exceeds the 1MB limit"
            "sender_id": "sender_id does not exist"
            "sender_id": "sender_id is not a verified sender identity"
            "list_ids": "list_ids do not all exist"
            "segment_ids": "segment_ids do not all exist"
            "ip_pool": "The ip pool you provided is invalid"
            "suppression_group_id": "suppression_group_id does not exist"
            "unsubscribes": "Either suppression_group_id or custom_unsubscribe_url may be set/used, but not both. Please remove one before setting the other."
            "": "The JSON you have submitted cannot be parsed."
            "": "You've reached your limit of 250 campaigns. Please delete one or more and try again."
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: title
                  message: title can't be blank
                - field: title
                  message: title is too long (maximum is 100 characters)
                - field: categories
                  message: categories exceeds 10 category limit
                - field: html_content
                  message: html_content exceeds the 1MB limit
                - field: plain_content
                  message: plain_content exceeds the 1MB limit
                - field: sender_id
                  message: sender_id does not exist
                - field: sender_id
                  message: sender_id is not a verified sender identity
                - field: list_ids
                  message: list_ids do not all exist
                - field: segment_ids
                  message: segment_ids do not all exist
                - field: ip_pool
                  message: The ip pool you provided is invalid
                - field: suppression_group_id
                  message: suppression_group_id does not exist
                - field: unsubscribes
                  message: 'Either suppression_group_id or custom_unsubscribe_url may be set/used, but not both. Please remove one before setting the other.'
                - field: null
                  message: The JSON you have submitted cannot be parsed.
                - field: null
                  message: You've reached your limit of 250 campaigns. Please delete one or more and try again.
        '401':
          description: ''
          schema:
            type: object
      security:
        - Authorization: []
    get:
      operationId: GET_campaigns
      summary: Retrieve all Campaigns
      tags:
        - Campaigns API
      description: |-
        **This endpoint allows you to retrieve a list of all of your campaigns.**

        Returns campaigns in reverse order they were created (newest first).

        Returns an empty array if no campaigns exist.

        For more information:

        * [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: The number of results you would like to receive at a time.
          type: integer
          default: 10
        - name: offset
          in: query
          description: 'The index of the first campaign to return, where 0 is the first campaign.'
          type: integer
          default: 0
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                items:
                  type: object
                  properties:
                    categories:
                      type: array
                      items:
                        type: string
                    custom_unsubscribe_url:
                      type: string
                    html_content:
                      type: string
                    id:
                      type: integer
                    ip_pool:
                      type: string
                    list_ids:
                      type: array
                      items:
                        type: integer
                    plain_content:
                      type: string
                    segment_ids:
                      type: array
                      items:
                        type: integer
                    sender_id:
                      type: integer
                    status:
                      type: string
                    subject:
                      type: string
                    suppression_group_id:
                      type: integer
                    title:
                      type: string
          examples:
            application/json:
              result:
                - categories:
                    - spring line
                  custom_unsubscribe_url: ''
                  html_content: <html><head><title></title></head><body><p>Check out our spring line!</p></body></html>
                  id: 986724
                  ip_pool: marketing
                  list_ids:
                    - 110
                  plain_content: Check out our spring line!
                  segment_ids:
                    - 110
                  sender_id: 124451
                  status: Draft
                  subject: New Products for Spring!
                  suppression_group_id: 42
                  title: March Newsletter
      security:
        - Authorization: []
  '/campaigns/{campaign_id}':
    parameters:
      - name: campaign_id
        in: path
        description: The id of the campaign you would like to retrieve.
        required: true
        type: integer
    get:
      operationId: GET_campaigns-campaign_id
      summary: Retrieve a single campaign
      tags:
        - Campaigns API
      description: |-
        **This endpoint allows you to retrieve a specific campaign.**

        Our Marketing Campaigns API lets you create, manage, send, and schedule campaigns.

        For more information:

        * [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              categories:
                type: array
                items:
                  type: string
              custom_unsubscribe_url:
                type: string
              html_content:
                type: string
              id:
                type: integer
              ip_pool:
                type: string
              list_ids:
                type: array
                items:
                  type: integer
              plain_content:
                type: string
              segment_ids:
                type: array
                items:
                  type: integer
              sender_id:
                type: integer
              status:
                type: string
              subject:
                type: string
              suppression_group_id:
                type: integer
              title:
                type: string
          examples:
            application/json:
              categories:
                - spring line
              custom_unsubscribe_url: ''
              html_content: <html><head><title></title></head><body><p>Check out our spring line!</p></body></html>
              id: 986724
              ip_pool: marketing
              list_ids:
                - 110
              plain_content: Check out our spring line!
              segment_ids:
                - 110
              sender_id: 124451
              status: Draft
              subject: New Products for Spring!
              suppression_group_id: 42
              title: March Newsletter
        '401':
          description: ''
          schema:
            type: object
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"": "not found"'
          schema:
            type: object
          examples:
            application/json:
              errors:
                - field: null
                  message: not found
      security:
        - Authorization: []
    delete:
      operationId: DELETE_campaigns-campaign_id
      summary: Delete a Campaign
      tags:
        - Campaigns API
      description: |-
        **This endpoint allows you to delete a specific campaign.**

        Our Marketing Campaigns API lets you create, manage, send, and schedule campaigns.

        For more information:

        * [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
      responses:
        '204':
          description: ''
          schema:
            type: 'null'
        '401':
          description: ''
          schema:
            type: object
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"": "not found"'
          schema:
            type: object
      security:
        - Authorization: []
    patch:
      operationId: PATCH_campaigns-campaign_id
      summary: Update a Campaign
      tags:
        - Campaigns API
      description: |-
        Update a campaign. This is especially useful if you only set up the campaign using POST /campaigns, but didn't set many of the parameters.

        For more information:

        * [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            title: Update a Campaign request
            type: object
            properties:
              title:
                type: string
                description: The title of the campaign.
              subject:
                type: string
                description: The subject line for your campaign.
              categories:
                type: array
                description: The categories you want to tag on this campaign.
                items:
                  type: string
              html_content:
                type: string
                description: The HTML content of this campaign.
              plain_content:
                type: string
                description: The plain content of this campaign.
            required:
              - title
              - subject
              - categories
              - html_content
              - plain_content
            example:
              title: May Newsletter
              subject: New Products for Summer!
              categories:
                - summer line
              html_content: <html><head><title></title></head><body><p>Check out our summer line!</p></body></html>
              plain_content: Check out our summer line!
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/campaign_response'
          examples:
            application/json:
              id: 986724
              title: May Newsletter
              subject: New Products for Summer!
              sender_id: 124451
              list_ids:
                - 110
                - 124
              segment_ids:
                - 110
              categories:
                - summer line
              suppression_group_id: 42
              custom_unsubscribe_url: ''
              ip_pool: marketing
              html_content: <html><head><title></title></head><body><p>Check out our summer line!</p></body></html>
              plain_content: Check out our summer line!
              status: Draft
        '400':
          description: |-
            "title": "title can't be blank"
            "title": "title is too long (maximum is 100 characters)"
            "categories": "categories exceeds 10 category limit"
            "html_content": "html_content exceeds the 1MB limit"
            "plain_content": "plain_content exceeds the 1MB limit"
            "sender_id": "sender_id does not exist"
            "sender_id": "sender_id is not a verified sender identity"
            "list_ids": "list_ids do not all exist"
            "segment_ids": "segment_ids do not all exist"
            "ip_pool": "The ip pool you provided is invalid"
            "suppression_group_id": "suppression_group_id does not exist"
            "unsubscribes": "Either suppression_group_id or custom_unsubscribe_url may be set/used, but not both. Please remove one before setting the other."
            "": "The JSON you have submitted cannot be parsed."
          schema:
            type: object
          examples:
            application/json:
              errors:
                - field: title
                  message: title can't be blank
                - field: title
                  message: title is too long (maximum is 100 characters)
                - field: categories
                  message: categories exceeds 10 category limit
                - field: html_content
                  message: html_content exceeds the 1MB limit
                - field: plain_content
                  message: plain_content exceeds the 1MB limit
                - field: sender_id
                  message: sender_id does not exist
                - field: sender_id
                  message: sender_id is not a verified sender identity
                - field: list_ids
                  message: list_ids do not all exist
                - field: segment_ids
                  message: segment_ids do not all exist
                - field: ip_pool
                  message: The ip pool you provided is invalid
                - field: suppression_group_id
                  message: suppression_group_id does not exist
                - field: unsubscribes
                  message: 'Either suppression_group_id or custom_unsubscribe_url may be set/used, but not both. Please remove one before setting the other.'
                - field: null
                  message: The JSON you have submitted cannot be parsed.
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '403':
          description: '"": "You may only update a campaign when it is in draft mode."'
          schema:
            type: object
          examples:
            application/json:
              errors:
                - field: null
                  message: You may only update a campaign when it is in draft mode.
        '404':
          description: '"": "not found"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: not found
      security:
        - Authorization: []
  '/campaigns/{campaign_id}/schedules/now':
    parameters:
      - name: campaign_id
        in: path
        required: true
        type: integer
    post:
      operationId: POST_campaigns-campaign_id-schedules-now
      summary: Send a Campaign
      tags:
        - Campaigns API
      description: |-
        **This endpoint allows you to immediately send a campaign at the time you make the API call.**

        Normally a POST would have a request body, but since this endpoint is telling us to send a resource that is already created, a request body is not needed.

        For more information:

        * [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
      responses:
        '201':
          description: ''
          schema:
            title: Send a Campaign response
            type: object
            properties:
              id:
                type: integer
                format: int64
              status:
                type: string
            required:
              - id
              - status
          examples:
            application/json:
              id: 1234
              status: Scheduled
        '400':
          description: |-
            "subject": "subject can't be blank"
            "sender_id": "sender_id can't be blank"
            "plain_content": "plain_content can't be blank, please provide plain text or html content"
            "list_ids": "You must select at least 1 segment or 1 list to send to."
            "unsubscribe_tag": "An [unsubscribe] tag in both your html and plain content is required to send a campaign."
            "suppression_group_id": "Either a suppression_group_id or custom_unsubscribe_url is required to send a campaign."
            "": "You do not have enough credits to send this campaign. Upgrade your plan to send more: https://app.sendgrid.com/settings/billing"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: subject
                  message: subject can't be blank
                - field: sender_id
                  message: sender_id can't be blank
                - field: plain_content
                  message: 'plain_content can''t be blank, please provide plain text or html content'
                - field: list_id
                  message: You must select at least 1 segment or 1 list to send to.
                - field: unsubscribe_tag
                  message: 'An [unsubscribe] tag in both your html and plain content is required to send a campaign.'
                - field: suppression_group_id
                  message: Either a suppression_group_id or custom_unsubscribe_url is required to send a campaign.
                - field: null
                  message: 'You do not have enough credits to send this campaign. Upgrade your plan to send more: https://app.sendgrid.com/settings/billing'
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '403':
          description: '"": "You may only send a campaign when it is in draft mode."'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: You may only send a campaign when it is in draft mode.
        '404':
          description: '"": "not found"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: not found
      security:
        - Authorization: []
  '/campaigns/{campaign_id}/schedules':
    parameters:
      - name: campaign_id
        in: path
        required: true
        type: integer
    post:
      operationId: POST_campaigns-campaign_id-schedules
      summary: Schedule a Campaign
      tags:
        - Campaigns API
      description: |-
        **This endpoint allows you to schedule a specific date and time for your campaign to be sent.**

        For more information:

        * [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            title: Schedule a Campaign request
            type: object
            properties:
              send_at:
                type: integer
                description: The unix timestamp for the date and time you would like your campaign to be sent out.
            required:
              - send_at
            example:
              send_at: 1489771528
      responses:
        '201':
          description: ''
          schema:
            title: Schedule a Campaign response
            type: object
            properties:
              id:
                type: integer
                description: The campaign ID.
              send_at:
                type: integer
                description: The date time you scheduled your campaign to be sent.
              status:
                type: string
                description: The status of your campaign.
                enum:
                  - Scheduled
            required:
              - id
              - send_at
              - status
          examples:
            application/json:
              id: 1234
              send_at: 1489771528
              status: Scheduled
        '400':
          description: |-
            "subject": "subject can't be blank"
            "sender_id": "sender_id can't be blank"
            "plain_content": "plain_content can't be blank, please provide plain text or html content"
            "list_ids": "You must select at least 1 segment or 1 list to send to."
            "send_at": "Please choose a future time for sending your campaign."
            "unsubscribe_tag": "An [unsubscribe] tag in both your html and plain content is required to send a campaign."
            "suppression_group_id": "Either a suppression_group_id or custom_unsubscribe_url is required to send a campaign."
            "": "The JSON you have submitted cannot be parsed."
            "":"You do not have enough credits to send this campaign. Upgrade your plan to send more: https://app.sendgrid.com/settings/billing"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: subject
                  message: subject can't be blank
                - field: sender_id
                  message: sender_id can't be blank
                - field: plain_content
                  message: 'plain_content can''t be blank, please provide plain text or html content'
                - field: list_id
                  message: You must select at least 1 segment or 1 list to send to.
                - field: unsubscribe_tag
                  message: 'An [unsubscribe] tag in both your html and plain content is required to send a campaign.'
                - field: suppression_group_id
                  message: Either a suppression_group_id or custom_unsubscribe_url is required to send a campaign.
                - field: null
                  message: 'You do not have enough credits to send this campaign. Upgrade your plan to send more: https://app.sendgrid.com/settings/billing'
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '403':
          description: '"": "You cannot POST to a campaign that has already sent or scheduled. However you can update a scheduled campaign with a PATCH."'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: You cannot POST to a campaign that has already sent or scheduled. However you can update a scheduled campaign with a PATCH.
        '404':
          description: '"": "not found"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: not found
      security:
        - Authorization: []
    patch:
      operationId: PATCH_campaigns-campaign_id-schedules
      summary: Update a Scheduled Campaign
      tags:
        - Campaigns API
      description: |-
        **This endpoint allows to you change the scheduled time and date for a campaign to be sent.**

        For more information:

        * [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            title: Update a Scheduled Campaign request
            type: object
            properties:
              send_at:
                type: integer
                format: int64
            required:
              - send_at
            example:
              send_at: 1489451436
      responses:
        '200':
          description: ''
          schema:
            title: Update a Scheduled Campaign response
            type: object
            properties:
              id:
                type: integer
                description: The campaign ID
              send_at:
                type: integer
                description: The unix timestamp to send the campaign.
              status:
                type: string
                description: The status of the schedule.
            required:
              - id
              - send_at
              - status
        '400':
          description: |-
            "": "The JSON you have submitted cannot be parsed."
            "send_at": "Please choose a future time for sending your campaign."
            "":"You do not have enough credits to send this campaign. Upgrade your plan to send more: https://app.sendgrid.com/settings/billing"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: send_at
                  message: Please choose a future time for sending your campaign.
                - field: null
                  message: The JSON you have submitted cannot be parsed.
                - field: null
                  message: 'You do not have enough credits to send this campaign. Upgrade your plan to send https://app.sendgrid.com/settings/billing'
        '403':
          description: '"send_at": "You cannot update the send_at value of non-scheduled campaign."'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: send_at
                  message: You cannot update the send_at value of non-scheduled campaign.
        '404':
          description: '"": "not found"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: not found
      security:
        - Authorization: []
    get:
      operationId: GET_campaigns-campaign_id-schedules
      summary: View Scheduled Time of a Campaign
      tags:
        - Campaigns API
      description: |-
        **This endpoint allows you to retrieve the date and time that the given campaign has been scheduled to be sent.**

        For more information:

        * [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            title: View Scheduled Time of a Campaign response
            type: object
            properties:
              send_at:
                type: integer
                format: int64
            required:
              - send_at
          examples:
            application/json:
              send_at: 1490778528
        '404':
          description: '"": "not found"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: not found
      security:
        - Authorization: []
    delete:
      operationId: DELETE_campaigns-campaign_id-schedules
      summary: Unschedule a Scheduled Campaign
      tags:
        - Campaigns API
      description: |-
        **This endpoint allows you to unschedule a campaign that has already been scheduled to be sent.**

        A successful unschedule will return a 204.
        If the specified campaign is in the process of being sent, the only option is to cancel (a different method).

        For more information:

        * [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
      responses:
        '204':
          description: ''
          schema:
            type: 'null'
        '403':
          description: |-
            "": "This campaign is already In Progress."
            "": "This campaign is already Sent."
            "": "This campaign is already Paused."
            "": "This campaign is already Canceled."
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: This campaign is already In Progress.
                - field: null
                  message: This campaign is already Sent.
                - field: null
                  message: This campaign is already Paused.
                - field: null
                  message: This campaign is already Canceled.
        '404':
          description: '"": "not found"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: not found
      security:
        - Authorization: []
  '/campaigns/{campaign_id}/schedules/test':
    parameters:
      - name: campaign_id
        in: path
        required: true
        type: integer
    post:
      operationId: POST_campaigns-campaign_id-schedules-test
      summary: Send a Test Campaign
      tags:
        - Campaigns API
      description: |-
        **This endpoint allows you to send a test campaign.**

        To send to multiple addresses, use an array for the JSON "to" value ["one@address","two@address"]

        For more information:

        * [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              to:
                type: string
                description: The email address that should receive the test campaign.
                format: email
            required:
              - to
            example:
              to: your.email@example.com
      responses:
        '204':
          description: ''
          schema:
            title: Send a Test Campaign request
            type: object
            properties:
              to:
                type: string
            required:
              - to
        '400':
          description: |-
            "": "The JSON you have submitted cannot be parsed."
            "to": "Please provide an email address to which the test should be sent."
            "to": "You can only send tests to 10 addresses at a time."
            "subject": "Please add a subject to your campaign before sending a test."
            "plain_content": "Plain content and html content can't both be blank. Please set one of these values before sending a test."
            "sender_id": "Please assign a sender identity to your campaign before sending a test."
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: send_at
                  message: Please choose a future time for sending your campaign.
                - field: null
                  message: The JSON you have submitted cannot be parsed.
                - field: null
                  message: 'You do not have enough credits to send this campaign. Upgrade your plan to send more: https://app.sendgrid.com/settings/billing'
        '404':
          description: '"": "not found"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: not found
      security:
        - Authorization: []
  /mail/batch:
    post:
      operationId: POST_mail-batch
      summary: Create a batch ID
      tags:
        - Cancel Scheduled Sends
      description: |-
        **This endpoint allows you to generate a new batch ID. This batch ID can be associated with scheduled sends via the mail/send endpoint.**

        If you set the SMTPAPI header \`batch_id\`, it allows you to then associate multiple scheduled mail/send requests together with the same ID. Then at anytime up to 10 minutes before the schedule date, you can cancel all of the mail/send requests that have this batch ID by calling the Cancel Scheduled Send endpoint.

        More Information:

        * [Scheduling Parameters > Batch ID](https://sendgrid.com/docs/API_Reference/SMTP_API/scheduling_parameters.html)
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/mail_batch_id'
          examples:
            application/json:
              batch_id: YOUR_BATCH_ID
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  '/mail/batch/{batch_id}':
    parameters:
      - name: batch_id
        in: path
        required: true
        type: string
    get:
      operationId: GET_mail-batch-batch_id
      summary: Validate batch ID
      tags:
        - Cancel Scheduled Sends
      description: |-
        **This endpoint allows you to validate a batch ID.**

        If you set the SMTPAPI header \`batch_id\`, it allows you to then associate multiple scheduled mail/send requests together with the same ID. Then at anytime up to 10 minutes before the schedule date, you can cancel all of the mail/send requests that have this batch ID by calling the Cancel Scheduled Send endpoint.

        More Information:

        * [Scheduling Parameters > Batch ID](https://sendgrid.com/docs/API_Reference/SMTP_API/scheduling_parameters.html)
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_batch_id'
          examples:
            application/json:
              batch_id: HkJ5yLYULb7Rj8GKSx7u025ouWVlMgAi
        '400':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: invalid batch id
        '401':
          description: Unexpected error in API call. See HTTP response body for details.
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  /user/scheduled_sends:
    post:
      operationId: POST_user-scheduled_sends
      summary: Cancel or pause a scheduled send
      tags:
        - Cancel Scheduled Sends
      description: |-
        **This endpoint allows you to cancel or pause an email that has been scheduled to be sent.**

        If the maximum number of cancellations/pauses are added, HTTP 400 will
        be returned.

        The Cancel Scheduled Sends feature allows the customer to cancel a scheduled send based on a Batch ID included in the SMTPAPI header. Scheduled sends cancelled less than 10 minutes before the scheduled time are not guaranteed to be cancelled.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            title: Cancel or pause a scheduled send request
            type: object
            properties:
              batch_id:
                type: string
                description: The batch ID is the identifier that your scheduled mail sends share.
                pattern: '^[a-zA-Z0-9]'
              status:
                type: string
                default: pause
                description: 'The status of the send you would like to implement. This can be pause or cancel. To delete a pause or cancel status see DELETE /v3/user/scheduled_sends/{batch_id}'
                enum:
                  - pause
                  - cancel
            required:
              - batch_id
              - status
            example:
              batch_id: YOUR_BATCH_ID
              status: pause
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/user_scheduled_send_status'
        '400':
          description: |-
            "" : "max limit reached"
            "batch_id" : "invalid batch id"
            "batch_id" : "a status for this batch id exists, try PATCH to update the status"
          schema:
            type: object
          examples:
            application/json:
              errors:
                - field: null
                  message: max limit reached
                - field: batch_id
                  message: invalid batch id
                - field: batch_id
                  message: 'a status for this batch id exists, try PATCH to update the status'
        '401':
          description: ''
          schema:
            type: object
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    get:
      operationId: GET_user-scheduled_sends
      summary: Retrieve all scheduled sends
      tags:
        - Cancel Scheduled Sends
      description: |-
        **This endpoint allows you to retrieve all cancel/paused scheduled send information.**

        The Cancel Scheduled Sends feature allows the customer to cancel a scheduled send based on a Batch ID included in the SMTPAPI header. Scheduled sends cancelled less than 10 minutes before the scheduled time are not guaranteed to be cancelled.
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/user_scheduled_send_status'
          examples:
            application/json:
              - batch_id: YzJlNTkxMmEtOWM3Ny0xMWU1LTkwM2UtNTI1NDAwNmQzZmYzLTVlM2NhNWIwYg
                status: cancel
              - batch_id: UtNTI1NDAwNmQzZmYzLTVlM2NhNWIwYgYzJlNTkxMmEtOWM3Ny0xMWU1LTkwM2
                status: cancel
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  '/user/scheduled_sends/{batch_id}':
    parameters:
      - name: batch_id
        in: path
        required: true
        type: string
    get:
      operationId: GET_user-scheduled_sends-batch_id
      summary: Retrieve scheduled send
      tags:
        - Cancel Scheduled Sends
      description: |-
        **This endpoint allows you to retrieve the cancel/paused scheduled send information for a specific \`batch_id\`.**

        The Cancel Scheduled Sends feature allows the customer to cancel a scheduled send based on a Batch ID included in the SMTPAPI header. Scheduled sends cancelled less than 10 minutes before the scheduled time are not guaranteed to be cancelled.
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: array
            title: Retrieve scheduled send response
            items:
              $ref: '#/definitions/user_scheduled_send_status'
          examples:
            application/json:
              - batch_id: HkJ5yLYULb7Rj8GKSx7u025ouWVlMgAi
                status: cancel
              - batch_id: IbLdyLYULb7Rj8GKSx7u025ouWVlAiMg
                status: pause
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    patch:
      operationId: PATCH_user-scheduled_sends-batch_id
      summary: Update user scheduled send information
      tags:
        - Cancel Scheduled Sends
      description: |-
        **This endpoint allows you to update the status of a scheduled send for the given \`batch_id\`.**

        The Cancel Scheduled Sends feature allows the customer to cancel a scheduled send based on a Batch ID included in the SMTPAPI header. Scheduled sends cancelled less than 10 minutes before the scheduled time are not guaranteed to be cancelled.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              status:
                type: string
                description: The status you would like the scheduled send to have.
                enum:
                  - cancel
                  - pause
            required:
              - status
            example:
              status: pause
      responses:
        '204':
          description: ''
          schema:
            type: 'null'
        '400':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: status
                  message: status must be either cancel or pause
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"" : "batch id not found"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: batch id not found
      security:
        - Authorization: []
    delete:
      operationId: DELETE_user-scheduled_sends-batch_id
      summary: Delete a cancellation or pause of a scheduled send
      tags:
        - Cancel Scheduled Sends
      description: |-
        **This endpoint allows you to delete the cancellation/pause of a scheduled send.**

        The Cancel Scheduled Sends feature allows the customer to cancel a scheduled send based on a Batch ID included in the SMTPAPI header. Scheduled sends cancelled less than 10 minutes before the scheduled time are not guaranteed to be cancelled.
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
      responses:
        '204':
          description: ''
          schema:
            type: 'null'
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: batch id not found
      security:
        - Authorization: []
  /categories:
    get:
      operationId: GET_categories
      summary: Retrieve all categories
      tags:
        - Categories
      description: |-
        **This endpoint allows you to retrieve a list of all of your categories.**

        Categories can help organize your email analytics by enabling you to “tag” emails by type or broad topic. You can define your own custom categories. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/categories.html).
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: The number of categories to display per page.
          type: integer
          default: 50
        - name: category
          in: query
          description: Allows you to perform a prefix search on this particular category.
          type: string
        - name: offset
          in: query
          description: The point in the list that you would like to begin displaying results.
          type: integer
          default: 0
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                category:
                  type: string
                  description: A category used to group emails by broad topic.
              required:
                - category
          examples:
            application/json:
              - category: category 1
              - category: category 2
        '400':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                description: The error returned.
                items:
                  type: object
                  properties:
                    field:
                      type: string
                    message:
                      type: string
                      description: A message explaining why your categories could not be retrieved.
                  required:
                    - field
                    - message
          examples:
            application/json:
              errors:
                - field: sort_by
                  message: invalid sort value
      security:
        - Authorization: []
  /categories/stats/sums:
    get:
      operationId: GET_categories-stats-sums
      summary: 'Retrieve sums of email stats for each category [Needs: Stats object defined, has category ID?]'
      tags:
        - Categories
      description: |-
        **This endpoint allows you to retrieve the total sum of each email statistic for every category over the given date range.**

        If you do not define any query parameters, this endpoint will return a sum for each category in groups of 10.

        Categories allow you to group your emails together according to broad topics that you define. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/categories.html).
      produces:
        - application/json
      parameters:
        - name: sort_by_metric
          in: query
          description: The metric that you want to sort by.  Must be a single metric.
          required: false
          type: string
          default: delivered
        - name: sort_by_direction
          in: query
          description: The direction you want to sort.
          required: false
          type: string
          default: desc
          enum:
            - desc
            - asc
        - name: start_date
          in: query
          description: The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.
          required: true
          type: string
        - name: end_date
          in: query
          description: The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.
          required: false
          type: string
        - name: limit
          in: query
          description: Limits the number of results returned.
          required: false
          type: integer
          default: 5
        - name: offset
          in: query
          description: The point in the list to begin retrieving results.
          required: false
          type: integer
          default: 0
        - name: aggregated_by
          in: query
          description: 'How to group the statistics. Must be either "day", "week", or "month".'
          required: false
          type: string
          enum:
            - day
            - week
            - month
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/category_stats'
          examples:
            application/json:
              date: '2015-01-01'
              stats:
                - metrics:
                    blocks: 0
                    bounce_drops: 0
                    bounces: 0
                    clicks: 20
                    deferred: 0
                    delivered: 20
                    invalid_emails: 0
                    opens: 20
                    processed: 0
                    requests: 20
                    spam_report_drops: 0
                    spam_reports: 0
                    unique_clicks: 20
                    unique_opens: 20
                    unsubscribe_drops: 0
                    unsubscribes: 20
                  name: cat1
                  type: category
                - metrics:
                    blocks: 1
                    bounce_drops: 0
                    bounces: 0
                    clicks: 19
                    deferred: 0
                    delivered: 19
                    invalid_emails: 0
                    opens: 19
                    processed: 0
                    requests: 20
                    spam_report_drops: 0
                    spam_reports: 0
                    unique_clicks: 19
                    unique_opens: 19
                    unsubscribe_drops: 0
                    unsubscribes: 19
                  name: cat2
                  type: category
                - metrics:
                    blocks: 0
                    bounce_drops: 0
                    bounces: 0
                    clicks: 5
                    deferred: 0
                    delivered: 5
                    invalid_emails: 0
                    opens: 5
                    processed: 0
                    requests: 5
                    spam_report_drops: 0
                    spam_reports: 0
                    unique_clicks: 5
                    unique_opens: 5
                    unsubscribe_drops: 0
                    unsubscribes: 5
                  name: cat3
                  type: category
                - metrics:
                    blocks: 0
                    bounce_drops: 0
                    bounces: 0
                    clicks: 6
                    deferred: 0
                    delivered: 5
                    invalid_emails: 0
                    opens: 6
                    processed: 0
                    requests: 5
                    spam_report_drops: 0
                    spam_reports: 0
                    unique_clicks: 5
                    unique_opens: 5
                    unsubscribe_drops: 0
                    unsubscribes: 6
                  name: cat4
                  type: category
                - metrics:
                    blocks: 10
                    bounce_drops: 0
                    bounces: 0
                    clicks: 0
                    deferred: 0
                    delivered: 0
                    invalid_emails: 0
                    opens: 0
                    processed: 0
                    requests: 10
                    spam_report_drops: 0
                    spam_reports: 0
                    unique_clicks: 0
                    unique_opens: 0
                    unsubscribe_drops: 0
                    unsubscribes: 0
                  name: cat5
                  type: category
      security:
        - Authorization: []
  /categories/stats:
    get:
      operationId: GET_categories-stats
      summary: Retrieve Email Statistics for Categories
      tags:
        - Categories
      description: |-
        **This endpoint allows you to retrieve all of your email statistics for each of your categories.**

        If you do not define any query parameters, this endpoint will return a sum for each category in groups of 10.

        Categories allow you to group your emails together according to broad topics that you define. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/categories.html).
      produces:
        - application/json
      parameters:
        - name: start_date
          in: query
          description: The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD
          required: true
          type: string
        - name: end_date
          in: query
          description: The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.
          required: false
          type: string
        - name: categories
          in: query
          description: The individual categories that you want to retrieve statistics for. You may include up to 10 different categories.
          required: true
          type: string
        - name: limit
          in: query
          description: The number of results to include.
          required: false
          type: integer
          default: 500
          maximum: 500
        - name: offset
          in: query
          description: The number of results to skip.
          required: false
          type: integer
        - name: aggregated_by
          in: query
          description: 'How to group the statistics. Must be either "day", "week", or "month".'
          required: false
          type: string
          enum:
            - day
            - week
            - month
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/category_stats'
          examples:
            application/json:
              - date: '2015-10-01'
                stats:
                  - type: category
                    name: docs
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
                  - type: category
                    name: mattscategory
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-11-01'
                stats:
                  - type: category
                    name: docs
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
                  - type: category
                    name: mattscategory
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
      security:
        - Authorization: []
  /contactdb/custom_fields:
    post:
      operationId: POST_contactdb-custom_fields
      summary: Create a Custom Field
      tags:
        - Contacts API - Custom Fields
      description: |-
        **This endpoint allows you to create a custom field.**

        The contactdb is a database of your contacts for [SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              name:
                type: string
              type:
                type: string
            example:
              name: pet
              type: text
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            type: object
            properties:
              id:
                type: integer
              name:
                type: string
              type:
                type: string
          examples:
            application/json:
              id: 1
              name: pet
              type: text
        '400':
          description: |-
            "" : "Returned if request body is invalid JSON"
            "type" : "Returned if custom field type is invalid or not provided"
            "name" : "Returned if custom field name is not provided"
          schema:
            $ref: '#/definitions/errors'
          examples:
            application/json:
              errors:
                - field: null
                  message: Returned if request body is invalid JSON
                - field: type
                  message: Returned if custom field type is invalid or not provided
                - field: name
                  message: Returned if custom field name is not provided
      security:
        - Authorization: []
    get:
      operationId: GET_contactdb-custom_fields
      summary: Retrieve all custom fields
      tags:
        - Contacts API - Custom Fields
      description: |-
        **This endpoint allows you to retrieve all custom fields.**

        The contactdb is a database of your contacts for [SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            title: List All Custom Fields response
            type: object
            properties:
              custom_fields:
                type: array
                items:
                  $ref: '#/definitions/contactdb_custom_field_with_id'
            required:
              - custom_fields
          examples:
            application/json:
              custom_fields:
                - id: 6234
                  name: age
                  type: number
                - id: 6233
                  name: country
                  type: text
                - id: 6235
                  name: favorite_color
                  type: text
                - id: 6239
                  name: fname
                  type: text
                - id: 6240
                  name: lname
                  type: text
                - id: 49439
                  name: pet
                  type: text
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  '/contactdb/custom_fields/{custom_field_id}':
    parameters:
      - name: custom_field_id
        in: path
        description: The ID of the custom field that you want to retrieve.
        required: true
        type: integer
    get:
      operationId: GET_contactdb-custom_fields-custom_field_id
      summary: Retrieve a Custom Field
      tags:
        - Contacts API - Custom Fields
      description: |-
        **This endpoint allows you to retrieve a custom field by ID.**

        The contactdb is a database of your contacts for [SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/contactdb_custom_field_with_id'
          examples:
            application/json:
              id: 1
              name: pet
              type: text
        '400':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: invalid id
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"custom_field_id" : "Returned if custom_field_id does not exist"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: Custom field ID does not exist
      security:
        - Authorization: []
    delete:
      operationId: DELETE_contactdb-custom_fields-custom_field_id
      summary: Delete a Custom Field
      tags:
        - Contacts API - Custom Fields
      description: |-
        **This endpoint allows you to delete a custom field by ID.**

        The contactdb is a database of your contacts for [SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '202':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              message: Custom Field delete is processing.
        '400':
          description: '"id" : "Returned if custom_field_id is not valid"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: Custom field in use by one or more segment conditions
                - message: Custom field ID does not exist
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"custom_field_id" : "Returned if custom_field_id does not exist"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: Custom field ID does not exist
      security:
        - Authorization: []
  /contactdb/reserved_fields:
    get:
      operationId: GET_contactdb-reserved_fields
      summary: Retrieve reserved fields
      tags:
        - Contacts API - Custom Fields
      description: |-
        **This endpoint allows you to list all fields that are reserved and can't be used for custom field names.**

        The contactdb is a database of your contacts for [SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            title: List fields that are reserved and can't be used for custom field names. response
            type: object
            properties:
              reserved_fields:
                type: array
                description: The reserved fields that are already set up within custom fields.
                items:
                  $ref: '#/definitions/contactdb_custom_field'
            required:
              - reserved_fields
          examples:
            application/json:
              reserved_fields:
                - name: first_name
                  type: text
                - name: last_name
                  type: text
                - name: email
                  type: text
                - name: created_at
                  type: date
                - name: updated_at
                  type: date
                - name: last_emailed
                  type: date
                - name: last_clicked
                  type: date
                - name: last_opened
                  type: date
                - name: my_custom_field
                  type: text
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  /contactdb/lists:
    post:
      operationId: POST_contactdb-lists
      summary: Create a List
      tags:
        - Contacts API - Lists
      description: |-
        **This endpoint allows you to create a list for your recipients.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            title: Create a List request
            type: object
            properties:
              name:
                type: string
            required:
              - name
            example:
              name: your list name
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/contactdb_list'
          examples:
            application/json:
              id: 1
              name: your list name
              recipient_count: 0
        '400':
          description: |-
            "name" : "Returned if list name is a duplicate of an existing list or segment"
            "name" : "Returned if list name is not a string"
            "" : "Returned if request body is invalid JSON"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: Returned if request body is invalid JSON
                - field: name
                  message: Returned if list name is not a string
                - field: name
                  message: Returned if list name is a duplicate of an existing list or segment
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    get:
      operationId: GET_contactdb-lists
      summary: Retrieve all lists
      tags:
        - Contacts API - Lists
      description: |-
        **This endpoint allows you to retrieve all of your recipient lists. If you don't have any lists, an empty array will be returned.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            title: List All Lists response
            type: object
            properties:
              lists:
                type: array
                items:
                  $ref: '#/definitions/contactdb_list'
            required:
              - lists
          examples:
            application/json:
              lists:
                - id: 1
                  name: the jones
                  recipient_count: 1
      security:
        - Authorization: []
    delete:
      operationId: DELETE_contactdb-lists
      summary: Delete Multiple lists
      tags:
        - Contacts API - Lists
      description: |-
        **This endpoint allows you to delete multiple recipient lists.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: array
            items:
              type: integer
            example:
              - 1
              - 2
              - 3
              - 4
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: 'null'
        '400':
          description: '"id" : "Returned if all list ids are not valid"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: list id was invalid
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  '/contactdb/lists/{list_id}':
    parameters:
      - name: list_id
        in: path
        required: true
        type: string
    get:
      operationId: GET_contactdb-lists-list_id
      summary: Retrieve a single list
      tags:
        - Contacts API - Lists
      description: |-
        This endpoint allows you to retrieve a single recipient list.

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      produces:
        - application/json
      parameters:
        - name: list_id
          in: query
          description: The ID of the list to retrieve.
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/contactdb_list'
          examples:
            application/json:
              id: 1
              name: listname
              recipient_count: 0
        '400':
          description: '"list_id" : "Returned if list_id is not valid"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: invalid id
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"list_id" : "Returned if list_id does not exist"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: List ID does not exist
      security:
        - Authorization: []
    patch:
      operationId: PATCH_contactdb-lists-list_id
      summary: Update a List
      tags:
        - Contacts API - Lists
      description: |-
        **This endpoint allows you to update the name of one of your recipient lists.**


        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: list_id
          in: query
          description: The ID of the list you are updating.
          required: true
          type: integer
        - name: body
          in: body
          schema:
            title: Update a List request
            type: object
            properties:
              name:
                type: string
                description: 'The new name for your list. '
            required:
              - name
            example:
              name: newlistname
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              id:
                type: integer
                description: The ID of the list
              name:
                type: string
                description: The new name for the list
              recipient_count:
                type: integer
                description: The number of recipients on the list
          examples:
            application/json:
              id: 1234
              name: 2016 iPhone Users
              recipient_count: 0
        '400':
          description: |-
            "name" : "Returned if list name is a duplicate of existing list or segment"
            "name" : "Returned if list name is invalid or not provided"
            "list_id" : "Returned if list_id is not valid"
            "" : "Returned if request body is invalid JSON"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: invalid id
        '404':
          description: '"list_id" : "Returned if list_id does not exist"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: List ID does not exist
      security:
        - Authorization: []
    delete:
      operationId: DELETE_contactdb-lists-list_id
      summary: Delete a List
      tags:
        - Contacts API - Lists
      description: |-
        **This endpoint allows you to delete a specific recipient list with the given ID.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      produces:
        - application/json
      parameters:
        - name: delete_contacts
          in: query
          description: Adds the ability to delete all contacts on the list in addition to deleting the list.
          type: boolean
          enum:
            - true
            - false
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '202':
          description: ''
          schema:
            type: 'null'
        '400':
          description: |-
            "list_id" : "Returned if list_id is not valid"
            "delete_contacts" : "Returned if delete_contacts is not valid"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: delete_contacts
                  message: delete_contacts not a bool
                - field: list_id
                  message: Returned if list_id is not valid
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"list_id" : "Returned if list_id does not exist"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: 'List not found: 5'
      security:
        - Authorization: []
  '/contactdb/lists/{list_id}/recipients':
    parameters:
      - name: list_id
        in: path
        description: The id of the list of recipients you want to retrieve.
        required: true
        type: integer
    get:
      operationId: GET_contactdb-lists-list_id-recipients
      summary: Retrieve all recipients on a List
      tags:
        - Contacts API - Lists
      description: |-
        **This endpoint allows you to retrieve all recipients on the list with the given ID.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      produces:
        - application/json
      parameters:
        - name: page
          in: query
          description: Page index of first recipient to return (must be a positive integer)
          required: false
          type: integer
        - name: page_size
          in: query
          description: Number of recipients to return at a time (must be a positive integer between 1 and 1000)
          required: false
          type: integer
        - name: list_id
          in: query
          description: The ID of the list whose recipients you are requesting.
          required: true
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              recipients:
                type: array
                items:
                  $ref: '#/definitions/contactdb_recipient'
          examples:
            application/json:
              recipients:
                - created_at: 1433348344
                  custom_fields:
                    - id: 6234
                      name: age
                      type: number
                      value: null
                    - id: 6233
                      name: country
                      type: text
                      value: null
                    - id: 6235
                      name: fname
                      type: text
                      value: Example
                    - id: 6239
                      name: lname
                      type: text
                      value: User
                    - id: 6240
                      name: lname
                      type: text
                      value: null
                  email: example@example.com
                  first_name: Example
                  id: ZGVWfyZWsuYmFpbmVzQHNlbmRmCmLkLmNv==
                  last_clicked: 1438616117
                  last_emailed: 1438613272
                  last_name: User
                  last_opened: 1438616109
                  updated_at: 1438616119
        '400':
          description: |-
            "list_id" : "Returned if list_id is not a valid integer"
            "page" : "Returned if page is not a valid integer"
            "page" : "Returned if page is less than 1"
            "page_size" : "Returned if page_size is not a valid integer"
            "page_size" : "Returned if page_size is less than 1 or greater than 1000"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: list_id
                  message: Returned if list_id is not a valid integer
                - field: page
                  message: Returned if page is not a valid integer
                - field: page
                  message: Returned if page is less than 1
                - field: page_size
                  message: Returned if page_size is not a valid integer
                - field: page_size
                  message: Returned if page_size is less than 1 or greater than 1000
        '404':
          description: '"list_id" : "Returned if list_id does not exist"'
          schema:
            type: object
          examples:
            application/json:
              errors:
                - field: list_id
                  message: Returned if list_id is invalid
      security:
        - Authorization: []
    post:
      operationId: POST_contactdb-lists-list_id-recipients
      summary: Add Multiple Recipients to a List
      tags:
        - Contacts API - Lists
      description: |-
        **This endpoint allows you to add multiple recipients to a list.**

        Adds existing recipients to a list, passing in the recipient IDs to add. Recipient IDs should be passed exactly as they are returned from recipient endpoints.

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: array
            items:
              type: string
            example:
              - recipient_id1
              - recipient_id2
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            type: 'null'
        '400':
          description: |-
            "list_id" : "Returned if list_id is not a valid integer"
            "" : "Returned if no valid recipient ids were passed"
            "" : "Returned if no recipients were added"
            "" : "Returned if request body is invalid JSON"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: list_id
                  message: list_id is invalid
                - field: recipient_id
                  message: no valid recipients were provided
                - field: null
                  message: no recipients were added
                - field: null
                  message: request body is invalid JSON
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"list_id": "Returned if list_id does not exist"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: list_id
                  message: list_id does not exist
                - field: recipient_id
                  message: recipient_id does not exist
      security:
        - Authorization: []
  '/contactdb/lists/{list_id}/recipients/{recipient_id}':
    parameters:
      - name: list_id
        in: path
        description: The ID of the list that you want to add the recipient to.
        required: true
        type: integer
      - name: recipient_id
        in: path
        description: The ID of the recipient you are adding to the list.
        required: true
        type: string
    post:
      operationId: POST_contactdb-lists-list_id-recipients-recipient_id
      summary: Add a Single Recipient to a List
      tags:
        - Contacts API - Lists
      description: |-
        **This endpoint allows you to add a single recipient to a list.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            type: 'null'
        '400':
          description: |-
            "list_id" : "Returned if list_id is invalid"
            "recipient_id" : "Returned if recipient_id is invalid"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: list_id
                  message: Returned if list_id is invalid
                - field: recipient_id
                  message: Returned if recipient_id is invalid
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: |-
            "list_id" : "Returned if list_id does not exist"
            "recipient_id" : "Returned if recipient_id does not exist"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: list_id
                  message: Returned if list_id does not exist
                - field: recipient_id
                  message: Returned if recipient_id does not exist
      security:
        - Authorization: []
    delete:
      operationId: DELETE_contactdb-lists-list_id-recipients-recipient_id
      summary: Delete a Single Recipient from a Single List
      tags:
        - Contacts API - Lists
      description: |-
        **This endpoint allows you to delete a single recipient from a list.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      produces:
        - application/json
      parameters:
        - name: list_id
          in: query
          description: The ID of the list you are taking this recipient away from.
          required: true
          type: integer
        - name: recipient_id
          in: query
          description: The ID of the recipient to take off the list.
          required: true
          type: integer
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: 'null'
        '400':
          description: |-
            "list_id" : "Returned if list_id is not valid"
            "recipient_id" : "Returned if recipient_id is not valid"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: list_id
                  message: Returned if list_id is invalid
                - field: recipient_id
                  message: no valid recipients were provided
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: |-
            "list_id" : "Returned if list_id does not exist"
            "recipient_id" : "Returned if recipient_id does not exist"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: list_id
                  message: Returned if list_id does not exist
                - field: recipient_id
                  message: Returned if recipient_id does not exist
      security:
        - Authorization: []
  /contactdb/status:
    get:
      operationId: GET_contactdb-status
      summary: Get Contact Upload Status
      tags:
        - Contacts API - Recipients
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:authorizationHeader:Authorization'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              status:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: string
                    value:
                      type: string
          examples:
            application/json:
              status:
                - id: worker_delay
                  value: delayed
                - id: worker_delay_seconds
                  value: '75.0'
  /contactdb/recipients:
    post:
      operationId: POST_contactdb-recipients
      summary: Add recipients
      tags:
        - Contacts API - Recipients
      description: |-
        **This endpoint allows you to add a Marketing Campaigns recipient.**

        You can add custom field data as a parameter on this endpoint. We have provided an example using some of the default custom fields SendGrid provides.

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: array
            items:
              type: object
              properties:
                email:
                  type: string
                  description: The email address of the recipient.
                  format: email
                first_name:
                  type: string
                  description: The first name of the recipient.
                last_name:
                  type: string
                  description: The last name of the recipient.
                age:
                  type: integer
              required:
                - email
            example:
              - email: example@example.com
                first_name: ''
                last_name: User
                age: 25
              - email: example2@example.com
                first_name: Example
                last_name: User
                age: 25
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/contactdb_recipient_response'
          examples:
            application/json:
              error_count: 1
              error_indices:
                - 2
              new_count: 2
              persisted_recipients:
                - YUBh
                - bWlsbGVyQG1pbGxlci50ZXN0
              updated_count: 0
              errors:
                - message: Invalid email.
                  error_indices:
                    - 2
        '400':
          description: '"" : "Returned if request body is not valid json"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: Request body is not valid json
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    patch:
      operationId: PATCH_contactdb-recipients
      summary: Update Recipient
      tags:
        - Contacts API - Recipients
      description: |-
        **This endpoint allows you to update one or more recipients.**

        The body of an API call to this endpoint must include an array of one or more recipient objects.

        It is of note that you can add custom field data as parameters on recipient objects. We have provided an example using some of the default custom fields SendGrid provides.

        The contactdb is a database of your contacts for [SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: array
            items:
              type: object
              properties:
                email:
                  type: string
                  format: email
                last_name:
                  type: string
                  description: The last name of the recipient. This is one of the default custom fields.
                first_name:
                  type: string
                  description: The first name of the recipient. This is one of the default custom fields.
              required:
                - email
            example:
              - email: jones@example.com
                last_name: Jones
                first_name: Guy
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/contactdb_recipient_response'
        '400':
          description: '"" : "Returned if request body is not valid json"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: Request body is not valid json
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    delete:
      operationId: DELETE_contactdb-recipients
      summary: Delete Recipient
      tags:
        - Contacts API - Recipients
      description: |-
        **This endpoint allows you to deletes one or more recipients.**

        The body of an API call to this endpoint must include an array of recipient IDs of the recipients you want to delete.

        The contactdb is a database of your contacts for [SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: array
            items:
              type: string
            example:
              - recipient_id1
              - recipient_id2
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
        '400':
          description: |-
            "" : "Returned if no recipients are deleted"
            "" : "Returned if all of the provided recipient ids are invalid"
            "" : "Returned if request body is not valid json"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: No recipient ids provided
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    get:
      operationId: GET_contactdb-recipients
      summary: Retrieve recipients
      tags:
        - Contacts API - Recipients
      description: |-
        **This endpoint allows you to retrieve all of your Marketing Campaigns recipients.**

        Batch deletion of a page makes it possible to receive an empty page of recipients before reaching the end of
        the list of recipients. To avoid this issue; iterate over pages until a 404 is retrieved.

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      produces:
        - application/json
      parameters:
        - name: page
          in: query
          description: Page index of first recipients to return (must be a positive integer)
          type: integer
        - name: page_size
          in: query
          description: Number of recipients to return at a time (must be a positive integer between 1 and 1000)
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            title: List Recipients response
            type: object
            properties:
              recipients:
                type: array
                items:
                  type: object
            required:
              - recipients
        '400':
          description: |-
            "page" : "Returned if page is not a valid integer"
            "page" : "Returned if page is less than 1"
            "page_size" : "Returned if page_size is not a valid integer"
            "page_size" : "Returned if page_size is less than 1 or greater than 1000"
          schema:
            type: object
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  '/contactdb/recipients/{recipient_id}':
    parameters:
      - name: recipient_id
        in: path
        description: The ID of the recipient that you want to retrieve.
        required: true
        type: string
    get:
      operationId: GET_contactdb-recipients-recipient_id
      summary: Retrieve a single recipient
      tags:
        - Contacts API - Recipients
      description: |-
        **This endpoint allows you to retrieve a single recipient by ID from your contact database.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/contactdb_recipient'
        '400':
          description: '"recipient_id" : "Returned if recipient_id is not valid"'
          schema:
            type: object
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"recipient_id" : "Returned if record for recipient id does not exist"'
          schema:
            type: object
      security:
        - Authorization: []
    delete:
      operationId: DELETE_contactdb-recipients-recipient_id
      summary: Delete a Recipient
      tags:
        - Contacts API - Recipients
      description: |-
        **This endpoint allows you to delete a single recipient with the given ID from your contact database.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
        '400':
          description: '"recipient_id" : "Returned if recipient_id is not valid"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: recipient not found
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"recipient_id" : "Returned if record for recipient id does not exist"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: recipient_id is not valid
      security:
        - Authorization: []
  '/contactdb/recipients/{recipient_id}/lists':
    parameters:
      - name: recipient_id
        in: path
        description: The ID of the recipient for whom you are retrieving lists.
        required: true
        type: string
    get:
      operationId: GET_contactdb-recipients-recipient_id-lists
      summary: Retrieve the lists that a recipient is on
      tags:
        - Contacts API - Recipients
      description: |-
        **This endpoint allows you to retrieve the lists that a given recipient belongs to.**

        Each recipient can be on many lists. This endpoint gives you all of the lists that any one recipient has been added to.

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              lists:
                type: array
                items:
                  $ref: '#/definitions/contactdb_list'
          examples:
            application/json:
              lists:
                - id: 1234
                  name: Example list
                  recipient_count: 42
        '400':
          description: '"recipient_id" : "Returned if recipient_id is not valid"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: recipient ID is invalid
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"recipient_id" : "Returned if record for the recipient id does not exist"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: recipient id not found
      security:
        - Authorization: []
  /contactdb/recipients/billable_count:
    get:
      operationId: GET_contactdb-recipients-billable_count
      summary: Retrieve the count of billable recipients
      tags:
        - Contacts API - Recipients
      description: |-
        **This endpoint allows you to retrieve the number of Marketing Campaigns recipients that you will be billed for.**

        You are billed for marketing campaigns based on the highest number of recipients you have had in your account at one time. This endpoint will allow you to know the current billable count value.

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/contactdb_recipient_count'
          examples:
            application/json:
              recipient_count: 1234
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  /contactdb/recipients/count:
    get:
      operationId: GET_contactdb-recipients-count
      summary: Retrieve a Count of Recipients
      tags:
        - Contacts API - Recipients
      description: |-
        **This endpoint allows you to retrieve the total number of Marketing Campaigns recipients.**

        The contactdb is a database of your contacts for [SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/contactdb_recipient_count'
          examples:
            application/json:
              recipient_count: 1234
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  /contactdb/recipients/search:
    get:
      operationId: GET_contactdb-recipients-search
      summary: Retrieve recipients matching search criteria
      tags:
        - Contacts API - Recipients
      description: |-
        **This endpoint allows you to perform a search on all of your Marketing Campaigns recipients.**

        field_name:

        * is a variable that is substituted for your actual custom field name from your recipient.
        * Text fields must be url-encoded. Date fields are searchable only by unix timestamp (e.g. 2/2/2015 becomes 1422835200)
        * If field_name is a 'reserved' date field, such as created_at or updated_at, the system will internally convert
        your epoch time to a date range encompassing the entire day. For example, an epoch time of 1422835600 converts to
        Mon, 02 Feb 2015 00:06:40 GMT, but internally the system will search from Mon, 02 Feb 2015 00:00:00 GMT through
        Mon, 02 Feb 2015 23:59:59 GMT.

        The contactdb is a database of your contacts for [SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).
      produces:
        - application/json
      parameters:
        - name: '{field_name}'
          in: query
          type: string
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              recipients:
                type: array
                items:
                  $ref: '#/definitions/contactdb_recipient'
          examples:
            application/json:
              recipients:
                - created_at: 1422313607
                  email: jones@example.com
                  first_name: null
                  id: YUBh
                  last_clicked: null
                  last_emailed: null
                  last_name: Jones
                  last_opened: null
                  updated_at: 1422313790
                  custom_fields:
                    - id: 23
                      name: pet
                      value: Fluffy
                      type: text
        '400':
          description: |-
            "" : "Returned if no search params are specified"
            "field" : "Returned if the provided field is invalid or does not exist"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: 'The following parameters are not custom fields or reserved fields: [{field_name}]'
                - message: No search params are specified
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  /contactdb/segments:
    post:
      operationId: POST_contactdb-segments
      summary: Create a Segment
      tags:
        - Contacts API - Segments
      description: |-
        **This endpoint allows you to create a segment.**

        All recipients in your contactdb will be added or removed automatically depending on whether they match the criteria for this segment.

        List Id:

        * Send this to segment from an existing list
        * Don't send this in order to segment from your entire contactdb.

        Valid operators for create and update depend on the type of the field you are segmenting:

        * **Dates:** "eq", "ne", "lt" (before), "gt" (after)
        * **Text:** "contains", "eq" (is - matches the full field), "ne" (is not - matches any field where the entire field is not the condition value)
        * **Numbers:** "eq", "lt", "gt"
        * **Email Clicks and Opens:** "eq" (opened), "ne" (not opened)

        Segment conditions using "eq" or "ne" for email clicks and opens should provide a "field" of either *clicks.campaign_identifier* or *opens.campaign_identifier*. The condition value should be a string containing the id of a completed campaign.

        Segments may contain multiple condtions, joined by an "and" or "or" in the "and_or" field. The first condition in the conditions list must have an empty "and_or", and subsequent conditions must all specify an "and_or".

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

        For more information about segments in Marketing Campaigns, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/lists.html#-Create-a-Segment).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/contactdb_segments'
            example:
              name: Last Name Miller
              list_id: 4
              conditions:
                - field: last_name
                  value: Miller
                  operator: eq
                  and_or: ''
                - field: last_clicked
                  value: 01/02/2015
                  operator: gt
                  and_or: and
                - field: clicks.campaign_identifier
                  value: '513'
                  operator: eq
                  and_or: or
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/contactdb_segments_with_id'
          examples:
            application/json:
              id: 1
              name: Last Name Miller
              list_id: 4
              conditions:
                - field: last_name
                  value: Miller
                  operator: eq
                  and_or: ''
                - field: last_clicked
                  value: 01/02/2015
                  operator: gt
                  and_or: and
                - field: clicks.campaign_identifier
                  value: '513'
                  operator: eq
                  and_or: or
              recipient_count: 0
        '400':
          description: |-
            "name" : "Returned if the name is not valid"
            "list_id" : "Returned if the list_id is not valid"
            "and_or" : "Returned if and_or and set value is not passed into the request body"
            "and_or" : "Returned if and_or is set on the only condition passed"
            "and_or" : "Returned if and_or is set on all conditions"
            "and_or" : "Returned if and_or is not set on more than one condition and less than all conditions"
            "operator" : "Returned if operator and set value is not passed into the request body"
            "value" : "Returned if value and set value is not passed into the request body"
            "field" : "Returned if field and set value is not passed into the request body"
            "" : "Returned if request body is not valid json"
            "" : "Returned if invalid value is passed into one of the request body parameters"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: request body is not valid json
                - message: invalid value is passed into one of the request body parameters
                - field: field
                  message: field and set value is not passed into the request body
                - field: value
                  message: value and set value is not passed into the request body
                - field: operator
                  message: operator and set value is not passed into the request body
                - field: and_or
                  message: and_or is not set on more than one condition and less than all conditions
                - field: and_or
                  message: and_or is set on all conditions
                - field: and_or
                  message: and_or is set on the only condition passed
                - field: and_or
                  message: and_or and set value is not passed into the request body
                - field: list_id
                  message: the list_id is not valid
                - field: name
                  message: the name is not valid
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    get:
      operationId: GET_contactdb-segments
      summary: Retrieve all segments
      tags:
        - Contacts API - Segments
      description: |-
        **This endpoint allows you to retrieve all of your segments.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

        For more information about segments in Marketing Campaigns, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/lists.html#-Create-a-Segment).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            title: List All Segments response
            type: object
            properties:
              segments:
                type: array
                items:
                  $ref: '#/definitions/contactdb_segments'
            required:
              - segments
          examples:
            application/json:
              segments:
                - id: 1234
                  name: Age segments < 25
                  conditions:
                    - field: age
                      value: '25'
                      operator: lt
                  recipient_count: 8
                - id: 2345
                  name: email address - gmail
                  conditions:
                    - field: email
                      value: '@gmail.com'
                      operator: contains
                  recipient_count: 0
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  '/contactdb/segments/{segment_id}':
    parameters:
      - name: segment_id
        in: path
        required: true
        type: string
    get:
      operationId: GET_contactdb-segments-segment_id
      summary: Retrieve a segment
      tags:
        - Contacts API - Segments
      description: |-
        **This endpoint allows you to retrieve a single segment with the given ID.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

        For more information about segments in Marketing Campaigns, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/lists.html#-Create-a-Segment).
      produces:
        - application/json
      parameters:
        - name: segment_id
          in: query
          description: The ID of the segment you want to request.
          required: true
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/contactdb_segments'
          examples:
            application/json:
              id: 1
              name: Last Name Miller
              list_id: 4
              conditions:
                - field: last_name
                  value: Miller
                  operator: eq
                  and_or: ''
              recipient_count: 1
        '400':
          description: '"segment_id" : "Returned if segment_id is not valid"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: if segment_id is not valid
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"segment_id" : "Returned if segment_id does not exist"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: segment_id not found
      security:
        - Authorization: []
    patch:
      operationId: PATCH_contactdb-segments-segment_id
      summary: Update a segment
      tags:
        - Contacts API - Segments
      description: |-
        **This endpoint allows you to update a segment.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

        For more information about segments in Marketing Campaigns, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/lists.html#-Create-a-Segment).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: segment_id
          in: query
          description: The ID of the segment you are updating.
          type: string
        - name: body
          in: body
          schema:
            type: object
            properties:
              name:
                type: string
              list_id:
                type: number
                description: The list ID you would like this segment to be built from.
              conditions:
                type: array
                description: The conditions by which this segment should be created.
                items:
                  $ref: '#/definitions/contactdb_segments_conditions'
            required:
              - name
            example:
              name: The Millers
              list_id: 5
              conditions:
                - field: last_name
                  value: Miller
                  operator: eq
                  and_or: ''
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/contactdb_segments'
          examples:
            application/json:
              id: 5
              name: The Millers
              list_id: 5
              conditions:
                - field: last_name
                  value: Miller
                  operator: eq
                  and_or: ''
              recipient_count: 1
        '400':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: request body is not valid json
                - message: invalid value is passed into one of the request body parameters
                - segment_id: segment_id
                  message: segment id is not valid
                - field: field
                  message: field and set value is not passed into the request body
                - field: value
                  message: value and set value is not passed into the request body
                - field: operator
                  message: operator and set value is not passed into the request body
                - field: and_or
                  message: and_or is not set on more than one condition and less than all conditions
                - field: and_or
                  message: and_or is set on all conditions
                - field: and_or
                  message: and_or is set on the only condition passed
                - field: and_or
                  message: and_or and set value is not passed into the request body
                - field: list_id
                  message: the list_id is not valid
                - field: name
                  message: the name is not valid
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    delete:
      operationId: DELETE_contactdb-segments-segment_id
      summary: Delete a segment
      tags:
        - Contacts API - Segments
      description: |-
        **This endpoint allows you to delete a segment from your recipients database.**

        You also have the option to delete all the contacts from your Marketing Campaigns recipient database who were in this segment.

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

        For more information about segments in Marketing Campaigns, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/lists.html#-Create-a-Segment).
      produces:
        - application/json
      parameters:
        - name: delete_contacts
          in: query
          description: True to delete all contacts matching the segment in addition to deleting the segment
          type: boolean
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: 'null'
        '400':
          description: |-
            "segment_id" : "Returned if segment_id is not valid"
            "delete_contacts" : "Returned if delete_contacts is not a valid boolean"
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: segment_id
                  message: Returned if segment_id is not valid
                - field: delete_contacts
                  message: Returned if delete_contacts is not a valid boolean
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: '"segment_id" : "Returned if segment_id does not exist"'
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: segment_id
                  message: segment_id does not exist
      security:
        - Authorization: []
  '/contactdb/segments/{segment_id}/recipients':
    parameters:
      - name: segment_id
        in: path
        description: The ID of the segment from which you want to retrieve recipients.
        required: true
        type: integer
    get:
      operationId: GET_contactdb-segments-segment_id-recipients
      summary: Retrieve recipients on a segment
      tags:
        - Contacts API - Segments
      description: |-
        **This endpoint allows you to retrieve all of the recipients in a segment with the given ID.**

        The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

        For more information about segments in Marketing Campaigns, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/lists.html#-Create-a-Segment).
      produces:
        - application/json
      parameters:
        - name: page
          in: query
          type: integer
        - name: page_size
          in: query
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            title: List Recipients On a Segment response
            type: object
            properties:
              recipients:
                type: array
                items:
                  $ref: '#/definitions/contactdb_recipient'
            required:
              - recipients
          examples:
            application/json:
              recipients:
                - created_at: 1422313607
                  email: jones@example.com
                  first_name: null
                  id: YUBh
                  last_clicked: null
                  last_emailed: null
                  last_name: Jones
                  last_opened: null
                  updated_at: 1422313790
                  custom_fields:
                    - id: 23
                      name: pet
                      value: Indiana
                      type: text
        '400':
          description: |-
            "page" : "Returned if page is not a valid integer"
            "page" : "Returned if page is less than 1"
            "page_size" : "Returned if page_size is not a valid integer"
          schema:
            type: object
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: |-
            "segment_id" : "Returned if segment_id is not valid"
            "segment_id" : "Returned if segment_id does not exist"
          schema:
            type: object
      security:
        - Authorization: []
  /suppression/invalid_emails:
    get:
      operationId: GET_suppression-invalid_emails
      summary: Retrieve all invalid emails
      tags:
        - Invalid Emails API
      description: |-
        **This endpoint allows you to retrieve a list of all invalid email addresses.**

        An invalid email occurs when you attempt to send email to an address that is formatted in a manner that does not meet internet email format standards or the email does not exist at the recipient’s mail server.

        Examples include addresses without the “@” sign or addresses that include certain special characters and/or spaces. This response can come from our own server or the recipient mail server.

        For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/invalid_emails.html).
      produces:
        - application/json
      parameters:
        - name: start_time
          in: query
          description: Refers start of the time range in unix timestamp when an invalid email was created (inclusive).
          type: integer
        - name: end_time
          in: query
          description: Refers end of the time range in unix timestamp when an invalid email was created (inclusive).
          type: integer
        - name: limit
          in: query
          description: Limit the number of results to be displayed per page.
          type: integer
        - name: offset
          in: query
          description: Paging offset. The point in the list to begin displaying results.
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            description: The list of invalid email addresses.
            items:
              type: object
              properties:
                created:
                  type: integer
                  description: A Unix timestamp indicating when the email address was added to the invalid emails list.
                email:
                  type: string
                  description: The email address that was marked as invalid.
                reason:
                  type: string
                  description: The reason that the email address was marked as invalid.
              required:
                - created
                - email
                - reason
          examples:
            application/json:
              - created: 1449953655
                email: user1@example.com
                reason: Mail domain mentioned in email address is unknown
              - created: 1449939373
                email: user1@example.com
                reason: Mail domain mentioned in email address is unknown
      security:
        - Authorization: []
    delete:
      operationId: DELETE_suppression-invalid_emails
      summary: Delete invalid emails
      tags:
        - Invalid Emails API
      description: |-
        **This endpoint allows you to remove email addresses from your invalid email address list.**

        There are two options for deleting invalid email addresses:

        1) You can delete all invalid email addresses by setting \`delete_all\` to true in the request body.
        2) You can delete some invalid email addresses by specifying certain addresses in an array in the request body.

        An invalid email occurs when you attempt to send email to an address that is formatted in a manner that does not meet internet email format standards or the email does not exist at the recipient’s mail server.

        Examples include addresses without the “@” sign or addresses that include certain special characters and/or spaces. This response can come from our own server or the recipient mail server.

        For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/invalid_emails.html).
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              delete_all:
                type: boolean
                description: Indicates if you want to remove all email address from the invalid emails list.
              emails:
                type: array
                description: The list of specific email addresses that you want to remove.
                items:
                  type: string
            example:
              delete_all: false
              emails:
                - example1@example.com
                - example2@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
      security:
        - Authorization: []
  '/suppression/invalid_emails/{email}':
    parameters:
      - name: email
        in: path
        description: The specific email address of the invalid email entry that you want to retrieve.
        required: true
        type: string
    get:
      operationId: GET_suppression-invalid_emails-email
      summary: Retrieve a specific invalid email
      tags:
        - Invalid Emails API
      description: |-
        **This endpoint allows you to retrieve a specific invalid email addresses.**

        An invalid email occurs when you attempt to send email to an address that is formatted in a manner that does not meet internet email format standards or the email does not exist at the recipient’s mail server.

        Examples include addresses without the “@” sign or addresses that include certain special characters and/or spaces. This response can come from our own server or the recipient mail server.

        For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/invalid_emails.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:authorizationHeader:Authorization'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                created:
                  type: integer
                  description: A Unix timestamp indicating when the email address was added to the invalid emails list.
                email:
                  type: string
                  description: The email address that was marked as invalid.
                reason:
                  type: string
                  description: A reason explaining why the email address was marked as invalid.
              required:
                - created
                - email
                - reason
          examples:
            application/json:
              - created: 1454433146
                email: test1@example.com
                reason: Mail domain mentioned in email address is unknown
    delete:
      operationId: DELETE_suppression-invalid_emails-email
      summary: Delete a specific invalid email
      tags:
        - Invalid Emails API
      description: |-
        **This endpoint allows you to remove a specific email address from the invalid email address list.**

        An invalid email occurs when you attempt to send email to an address that is formatted in a manner that does not meet internet email format standards or the email does not exist at the recipient’s mail server.

        Examples include addresses without the “@” sign or addresses that include certain special characters and/or spaces. This response can come from our own server or the recipient mail server.

        For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/invalid_emails.html).
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:authorizationHeader:Authorization'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
  /access_settings/activity:
    get:
      operationId: GET_access_settings-activity
      summary: Retrieve all recent access attempts
      tags:
        - IP Access Management
      description: |-
        **This endpoint allows you to retrieve a list of all of the IP addresses that recently attempted to access your account either through the User Interface or the API.**

        IP Access Management allows you to control which IP addresses can be used to access your account, either through the User Interface or the API. There is no limit to the number of IP addresses that you can add to your whitelist. It is possible to remove your own IP address from the whitelist, thus preventing yourself from accessing your account.

        For more information, please see our [User Guide](http://sendgrid.com/docs/User_Guide/Settings/ip_access_management.html).
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: Limits the number of IPs to return.
          type: integer
          default: 20
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                items:
                  type: object
                  properties:
                    allowed:
                      type: boolean
                    auth_method:
                      type: string
                    first_at:
                      type: integer
                    ip:
                      type: string
                    last_at:
                      type: integer
                    location:
                      type: string
          examples:
            application/json:
              result:
                - allowed: false
                  auth_method: basic
                  first_at: 1444087966
                  ip: 1.1.1.1
                  last_at: 1444406672
                  location: Australia
      security:
        - Authorization: []
  /access_settings/whitelist:
    get:
      operationId: GET_access_settings-whitelist
      summary: Retrieve a list of currently whitelisted IPs
      tags:
        - IP Access Management
      description: |-
        **This endpoint allows you to retrieve a list of IP addresses that are currently whitelisted.**

        IP Access Management allows you to control which IP addresses can be used to access your account, either through the User Interface or the API. There is no limit to the number of IP addresses that you can add to your whitelist. It is possible to remove your own IP address from the whitelist, thus preventing yourself from accessing your account.

        For more information, please see our [User Guide](http://sendgrid.com/docs/User_Guide/Settings/ip_access_management.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                description: An array listing all of your whitelisted IPs.
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                      description: The ID of the whitelisted IP.
                    ip:
                      type: string
                      description: The whitelisted IP.
                    created_at:
                      type: integer
                      description: A Unix timestamp indicating when the IP was whitelisted.
                    updated_at:
                      type: integer
                      description: A Unix timestamp indicating when the IPs whitelisting status was most recently updated.
                  required:
                    - id
                    - ip
                    - created_at
                    - updated_at
            required:
              - result
          examples:
            application/json:
              result:
                - id: 1
                  ip: 192.168.1.1/32
                  created_at: 1441824715
                  updated_at: 1441824715
                - id: 2
                  ip: 192.168.1.2/32
                  created_at: 1441824715
                  updated_at: 1441824715
                - id: 3
                  ip: 192.168.1.3/32
                  created_at: 1441824715
                  updated_at: 1441824715
      security:
        - Authorization: []
    post:
      operationId: POST_access_settings-whitelist
      summary: Add one or more IPs to the whitelist
      tags:
        - IP Access Management
      description: |-
        **This endpoint allows you to add one or more IP addresses to your IP whitelist.**

        When adding an IP to your whitelist, include the IP address in an array. You can whitelist one IP at a time, or you can whitelist multiple IPs at once.

        IP Access Management allows you to control which IP addresses can be used to access your account, either through the User Interface or the API. There is no limit to the number of IP addresses that you can add to your whitelist. It is possible to remove your own IP address from the whitelist, thus preventing yourself from accessing your account.

        For more information, please see our [User Guide](http://sendgrid.com/docs/User_Guide/Settings/ip_access_management.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              ips:
                type: array
                description: An array containing the IP(s) you want to whitelist.
                items:
                  type: object
                  properties:
                    ip:
                      type: string
                      description: An IP address that you want to whitelist.
                  required:
                    - ip
            required:
              - ips
            example:
              ips:
                - ip: 192.168.1.1
                - ip: 192.*.*.*
                - ip: 192.168.1.3/32
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                description: An array listing all of your whitelisted IPs.
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                      description: The ID of the whitelisted IP.
                    ip:
                      type: string
                      description: The whitelisted IP.
                    created_at:
                      type: integer
                      description: A Unix timestamp indicating when the IP was whitelisted.
                    updated_at:
                      type: integer
                      description: A Unix timestamp indicating when the IPs whitelisting status was most recently updated.
                  required:
                    - id
                    - ip
                    - created_at
                    - updated_at
            required:
              - result
          examples:
            application/json:
              result:
                - id: 1
                  ip: 192.168.1.1/32
                  created_at: 1441824715
                  updated_at: 1441824715
                - id: 2
                  ip: 192.0.0.0/8
                  created_at: 1441824715
                  updated_at: 1441824715
                - id: 3
                  ip: 192.168.1.3/32
                  created_at: 1441824715
                  updated_at: 1441824715
      security:
        - Authorization: []
    delete:
      operationId: DELETE_access_settings-whitelist
      summary: Remove one or more IPs from the whitelist
      tags:
        - IP Access Management
      description: |-
        **This endpoint allows you to remove one or more IPs from your IP whitelist.**

        You can remove one IP at a time, or you can remove multiple IP addresses.

        IP Access Management allows you to control which IP addresses can be used to access your account, either through the User Interface or the API. There is no limit to the number of IP addresses that you can add to your whitelist. It is possible to remove your own IP address from the whitelist, thus preventing yourself from accessing your account.

        For more information, please see our [User Guide](http://sendgrid.com/docs/User_Guide/Settings/ip_access_management.html).
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              ids:
                type: array
                description: An array of the IDs of the IP address that you want to remove from your whitelist.
                items:
                  type: integer
            example:
              ids:
                - 1
                - 2
                - 3
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
      security:
        - Authorization: []
  '/access_settings/whitelist/{rule_id}':
    parameters:
      - name: rule_id
        in: path
        description: The ID of the whitelisted IP address that you want to retrieve.
        required: true
        type: string
    get:
      operationId: GET_access_settings-whitelist-rule_id
      summary: Retrieve a specific whitelisted IP
      tags:
        - IP Access Management
      description: |-
        **This endpoint allows you to retreive a specific IP address that has been whitelisted.**

        You must include the ID for the specific IP address you want to retrieve in your call.

        IP Access Management allows you to control which IP addresses can be used to access your account, either through the User Interface or the API. There is no limit to the number of IP addresses that you can add to your whitelist. It is possible to remove your own IP address from the whitelist, thus preventing yourself from accessing your account.

        For more information, please see our [User Guide](http://sendgrid.com/docs/User_Guide/Settings/ip_access_management.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              id:
                type: integer
                description: The ID of the IP address.
              ip:
                type: string
                description: The IP address.
              created_at:
                type: integer
                description: A Unix timestamp indicating when the IP was whitelisted.
              updated_at:
                type: integer
                description: A Unix timestamp indicating when the IP address was last updated.
            required:
              - id
              - ip
              - created_at
              - updated_at
          examples:
            application/json:
              id: 1
              ip: 192.168.1.1
              created_at: 1441824715
              updated_at: 1441824715
      security:
        - Authorization: []
    delete:
      operationId: DELETE_access_settings-whitelist-rule_id
      summary: Remove a specific IP from the whitelist
      tags:
        - IP Access Management
      description: |-
        **This endpoint allows you to remove a specific IP address from your IP whitelist.**

        When removing a specific IP address from your whitelist, you must include the ID in your call.

        IP Access Management allows you to control which IP addresses can be used to access your account, either through the User Interface or the API. There is no limit to the number of IP addresses that you can add to your whitelist. It is possible to remove your own IP address from the whitelist, thus preventing yourself from accessing your account.

        For more information, please see our [User Guide](http://sendgrid.com/docs/User_Guide/Settings/ip_access_management.html).
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
      security:
        - Authorization: []
  /ips:
    post:
      operationId: POST_ips
      summary: Add IPs
      tags:
        - IP Addresses
      description: This endpoint is for adding a(n) IP Address(es) to your account.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              count:
                type: integer
                description: The amount of IPs to add to the account.
              subusers:
                type: array
                description: Array of usernames to be assigned a send IP.
                items:
                  type: string
              warmup:
                type: boolean
                default: false
                description: Whether or not to warmup the IPs being added.
            required:
              - count
            example:
              count: 90323478
              subusers:
                - subuser1
                - subuser2
              warmup: true
              user_can_send: true
      responses:
        '201':
          description: ''
          schema:
            type: object
            properties:
              ips:
                type: array
                description: List of IP objects.
                items:
                  type: object
                  properties:
                    ip:
                      type: string
                      description: IP added to account.
                    subusers:
                      type: array
                      description: Array of usernames assigned a send IP.
                      items:
                        type: string
                  required:
                    - ip
                    - subusers
              remaining_ips:
                type: integer
                description: The number of IPs that can still be added to the user.
              warmup:
                type: boolean
                description: Whether or not the IPs are being warmed up.
            required:
              - ips
              - remaining_ips
              - warmup
          examples:
            application/json:
              ips:
                - ip: 1.2.3.4
                  subusers:
                    - user
                    - subuser1
                - ip: 1.2.3.5
                  subusers:
                    - user
                    - subuser1
              remaining_ips: 1
              warmup: true
        '400':
          description: ''
          schema:
            $ref: '#/definitions/errors'
          examples:
            application/json:
              errors:
                - field: null
                  message: one or more subusers do not belong to this user
      security:
        - Authorization: []
    get:
      operationId: GET_ips
      summary: Retrieve all IP addresses
      tags:
        - IP Addresses
      description: |-
        **This endpoint allows you to retrieve a list of all assigned and unassigned IPs.**

        Response includes warm up status, pools, assigned subusers, and whitelabel info. The start_date field corresponds to when warmup started for that IP.

        A single IP address or a range of IP addresses may be dedicated to an account in order to send email for multiple domains. The reputation of this IP is based on the aggregate performance of all the senders who use it.
      produces:
        - application/json
      parameters:
        - name: ip
          in: query
          description: The IP address to get
          type: string
        - name: exclude_whitelabels
          in: query
          description: Should we exclude whitelabels?
          type: boolean
        - name: limit
          in: query
          description: The number of IPs you want returned at the same time.
          type: integer
          default: 10
        - name: offset
          in: query
          description: The offset for the number of IPs that you are requesting.
          type: integer
          default: 0
        - name: subuser
          in: query
          description: The subuser you are requesting for.
          type: string
        - name: sort_by_direction
          in: query
          description: The direction to sort the results.
          type: string
          enum:
            - desc
            - asc
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                ip:
                  type: string
                  description: An IP address.
                subusers:
                  type: array
                  description: The subusers that are able to send email from this IP.
                  items:
                    type: string
                rdns:
                  type: string
                  description: The reverse DNS record for this IP address.
                pools:
                  type: array
                  description: The IP pools that this IP has been added to.
                  items:
                    type: string
                warmup:
                  type: boolean
                  description: Indicates if this IP address is currently warming up.
                start_date:
                  type:
                    - number
                    - 'null'
                  description: The date that the IP address was entered into warmup.
                whitelabeled:
                  type: boolean
                  description: Indicates if this IP address has been whitelabeled.
                assigned_at:
                  type:
                    - integer
                    - 'null'
                  description: The date that the IP address was assigned to the user.
              required:
                - ip
                - subusers
                - pools
                - warmup
                - start_date
                - whitelabeled
                - assigned_at
          examples:
            application/json:
              - ip: 192.168.1.1
                pools:
                  - pool1
                  - pool2
                whitelabeled: false
                start_date: 1409616000
                subusers:
                  - tim@sendgrid.net
                warmup: false
                assigned_at: 1482883200
              - ip: 208.115.214.22
                pools: []
                whitelabeled: true
                rdns: o1.email.burgermail.com
                start_date: 1409616000
                subusers: []
                warmup: false
                assigned_at: 1482883200
      security:
        - Authorization: []
  /ips/remaining:
    get:
      operationId: GET_ips-remaining
      summary: Get remaining IPs count
      tags:
        - IP Addresses
      description: This endpoint gets amount of IP Addresses that can still be created during a given period and the price of those IPs.
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              results:
                type: array
                items:
                  type: object
                  properties:
                    remaining:
                      type: integer
                      description: The number of IPs that can still be added to the user.
                    period:
                      type: string
                      description: The length of time until user can add more IPs.
                    price_per_ip:
                      type: number
                      description: The current cost to add an IP.
                  required:
                    - remaining
                    - period
                    - price_per_ip
            required:
              - results
          examples:
            application/json:
              results:
                - remaining: 2
                  period: month
                  price_per_ip: 20
      security:
        - Authorization: []
  /ips/assigned:
    get:
      operationId: GET_ips-assigned
      summary: Retrieve all assigned IPs
      tags:
        - IP Addresses
      description: |-
        **This endpoint allows you to retrieve only assigned IP addresses.**

        A single IP address or a range of IP addresses may be dedicated to an account in order to send email for multiple domains. The reputation of this IP is based on the aggregate performance of all the senders who use it.
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: array
            title: List all assigned IPs response
            items:
              type: object
              properties:
                ip:
                  type: string
                  description: The IP address.
                pools:
                  type: array
                  description: The IP pools that this IP address has been added to.
                  items:
                    type: string
                warmup:
                  type: boolean
                  description: Indicates if this IP address is currently warming up.
                start_date:
                  type: integer
                  description: The start date that this IP address was entered into warmup.
              required:
                - ip
                - pools
                - warmup
                - start_date
          examples:
            application/json:
              - ip: 167.89.21.3
                pools:
                  - new_test5
                warmup: true
                start_date: 1409616000
      security:
        - Authorization: []
  '/ips/{ip_address}':
    parameters:
      - name: ip_address
        in: path
        description: The IP address you are retrieving the IP pools for.
        required: true
        type: string
    get:
      operationId: GET_ips-ip_address
      summary: Retrieve all IP pools an IP address belongs to
      tags:
        - IP Addresses
      description: |-
        **This endpoint allows you to see which IP pools a particular IP address has been added to.**

        The same IP address can be added to multiple IP pools.

        A single IP address or a range of IP addresses may be dedicated to an account in order to send email for multiple domains. The reputation of this IP is based on the aggregate performance of all the senders who use it.
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              ip:
                type: string
                description: The IP address.
              subusers:
                type: array
                description: The subusers that can send email using this IP address.
                items:
                  type: string
              rdns:
                type: string
                description: The reverse DNS record for this IP address.
              pools:
                type: array
                description: The list of IP pools that this IP address belongs to.
                items:
                  type: string
              warmup:
                type: boolean
                description: Indicates if this IP address is currently warming up.
              start_date:
                type:
                  - integer
                  - 'null'
                description: The date that the IP address was entered into warmup.
              whitelabeled:
                type: boolean
                description: Indicates if this IP address has been whitelabeled.
            required:
              - ip
              - subusers
              - rdns
              - pools
              - warmup
              - start_date
              - whitelabeled
          examples:
            application/json:
              ip: 000.00.00.0
              subusers:
                - subuser1
                - subuser2
              rdns: o1.em.example.com
              pools:
                - test1
              warmup: false
              start_date: null
              whitelabeled: true
      security:
        - Authorization: []
  /ips/pools:
    post:
      operationId: POST_ips-pools
      summary: Create an IP pool.
      tags:
        - IP Pools
      description: |-
        **This endpoint allows you to create an IP pool.**

        **Each user can create up to 10 different IP pools.**

        IP Pools allow you to group your dedicated SendGrid IP addresses together. For example, you could create separate pools for your transactional and marketing email. When sending marketing emails, specify that you want to use the marketing IP pool. This allows you to maintain separate reputations for your different email traffic.

        IP pools can only be used with whitelabeled IP addresses.

        If an IP pool is NOT specified for an email, it will use any IP available, including ones in pools.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              name:
                type: string
                description: The name of your new IP pool.
                maxLength: 64
            required:
              - name
            example:
              name: marketing
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/ip_pool'
          examples:
            application/json:
              name: marketing
      security:
        - Authorization: []
    get:
      operationId: GET_ips-pools
      summary: Retrieve all IP pools.
      tags:
        - IP Pools
      description: |-
        **This endpoint allows you to retreive all of your IP pools.**

        IP Pools allow you to group your dedicated SendGrid IP addresses together. For example, you could create separate pools for your transactional and marketing email. When sending marketing emails, specify that you want to use the marketing IP pool. This allows you to maintain separate reputations for your different email traffic.

        IP pools can only be used with whitelabeled IP addresses.

        If an IP pool is NOT specified for an email, it will use any IP available, including ones in pools.
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/ip_pool'
          examples:
            application/json:
              - name: marketing
              - name: transactional
      security:
        - Authorization: []
  '/ips/pools/{pool_name}':
    parameters:
      - name: pool_name
        in: path
        description: The name of the IP pool that you want to retrieve the IP addresses from.
        required: true
        type: string
    get:
      operationId: GET_ips-pools-pool_name
      summary: Retrieve all IPs in a specified pool.
      tags:
        - IP Pools
      description: |-
        **This endpoint allows you to list all of the IP addresses that are in a specific IP pool.**

        IP Pools allow you to group your dedicated SendGrid IP addresses together. For example, you could create separate pools for your transactional and marketing email. When sending marketing emails, specify that you want to use the marketing IP pool. This allows you to maintain separate reputations for your different email traffic.

        IP pools can only be used with whitelabeled IP addresses.

        If an IP pool is NOT specified for an email, it will use any IP available, including ones in pools.
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              pool_name:
                type: string
                description: The name of the IP pool.
                maxLength: 64
              ips:
                type: array
                description: The list of IP addresses that belong to this IP pool.
                items:
                  type: string
            required:
              - pool_name
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    field:
                      type: string
                      description: The name of the error.
                    message:
                      type: string
                      description: A message explaining why the IP addresses could not be listed.
          examples:
            application/json:
              errors:
                - field: error
                  message: Unable to locate specified IPs Pool
      security:
        - Authorization: []
    put:
      operationId: PUT_ips-pools-pool_name
      summary: Update an IP pool’s name.
      tags:
        - IP Pools
      description: |-
        **This endpoint allows you to update the name of an IP pool.**

        IP Pools allow you to group your dedicated SendGrid IP addresses together. For example, you could create separate pools for your transactional and marketing email. When sending marketing emails, specify that you want to use the marketing IP pool. This allows you to maintain separate reputations for your different email traffic.

        IP pools can only be used with whitelabeled IP addresses.

        If an IP pool is NOT specified for an email, it will use any IP available, including ones in pools.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              name:
                type: string
                description: The new name for your IP pool.
                maxLength: 64
            example:
              name: new_pool_name
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/ip_pool'
          examples:
            application/json:
              name: new_pool_name
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    field:
                      type: 'null'
                    message:
                      type: string
                      description: A message explaining why the name of your IP pool could not be updated.
          examples:
            application/json:
              errors:
                - field: null
                  message: ip pool not found
      security:
        - Authorization: []
    delete:
      operationId: DELETE_ips-pools-pool_name
      summary: Delete an IP pool.
      tags:
        - IP Pools
      description: |-
        **This endpoint allows you to delete an IP pool.**

        IP Pools allow you to group your dedicated SendGrid IP addresses together. For example, you could create separate pools for your transactional and marketing email. When sending marketing emails, specify that you want to use the marketing IP pool. This allows you to maintain separate reputations for your different email traffic.

        IP pools can only be used with whitelabeled IP addresses.

        If an IP pool is NOT specified for an email, it will use any IP available, including ones in pools.
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
      responses:
        '204':
          description: ''
          schema:
            type: object
        '404':
          description: ''
          schema:
            type: object
            properties:
              error:
                type: string
                description: An error explaining why the pool could not be deleted.
          examples:
            application/json:
              error: Unable to locate specified IPs Pool
      security:
        - Authorization: []
  '/ips/pools/{pool_name}/ips':
    parameters:
      - name: pool_name
        in: path
        description: The name of the IP pool that you want to add an IP address to.
        required: true
        type: string
    post:
      operationId: POST_ips-pools-pool_name-ips
      summary: Add an IP address to a pool
      tags:
        - IP Pools
      description: |-
        **This endpoint allows you to add an IP address to an IP pool.**

        You can add the same IP address to multiple pools. It may take up to 60 seconds for your IP address to be added to a pool after your request is made.

        A single IP address or a range of IP addresses may be dedicated to an account in order to send email for multiple domains. The reputation of this IP is based on the aggregate performance of all the senders who use it.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              ip:
                type: string
                description: The IP address that you want to add to an IP pool.
            example:
              ip: 0.0.0.0
      responses:
        '201':
          description: ''
          schema:
            type: object
            properties:
              ip:
                type: string
                description: The IP address.
              pools:
                type: array
                description: The list of IP pools that this IP address has been added to.
                items:
                  type: string
              start_date:
                type: integer
                description: A unix timestamp indicating when the warmup process began for the IP address.
              warmup:
                type: boolean
                description: Indicates if the IP address is in warmup.
            required:
              - ip
              - pools
              - start_date
              - warmup
          examples:
            application/json:
              ip: 000.00.00.0
              pools:
                - test1
              start_date: 1409616000
              warmup: true
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                description: The error returned.
                items:
                  type: object
                  properties:
                    field:
                      type: 'null'
                    message:
                      type: string
                      description: A message explaining why the IP address could not be added to the IP Pool.
          examples:
            application/json:
              errors:
                - field: null
                  message: resource not found
      security:
        - Authorization: []
  '/ips/pools/{pool_name}/ips/{ip}':
    parameters:
      - name: pool_name
        in: path
        description: The name of the IP pool that you are removing the IP address from.
        required: true
        type: string
      - name: ip
        in: path
        description: The IP address that you are removing.
        required: true
        type: string
    delete:
      operationId: DELETE_ips-pools-pool_name-ips-ip
      summary: Remove an IP address from a pool.
      tags:
        - IP Pools
      description: |-
        **This endpoint allows you to remove an IP address from an IP pool.**

        The same IP address can be added to multiple IP pools.

        A single IP address or a range of IP addresses may be dedicated to an account in order to send email for multiple domains. The reputation of this IP is based on the aggregate performance of all the senders who use it.
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
      responses:
        '204':
          description: ''
          schema:
            type: object
        '404':
          description: ''
          schema:
            type: object
            properties:
              error:
                type: string
                description: An error explaining why the IP address could not be removed from the IP pool.
          examples:
            application/json:
              error: Unable to locate specified IPs Pool
      security:
        - Authorization: []
  /ips/warmup:
    get:
      operationId: GET_ips-warmup
      summary: Retrieve all IPs currently in warmup
      tags:
        - IP Warmup
      description: |-
        **This endpoint allows you to retrieve all of your IP addresses that are currently warming up.**

        SendGrid can automatically warm up dedicated IP addresses by limiting the amount of mail that can be sent through them per hour, with the limit determined by how long the IP address has been in warmup. See the [warmup schedule](https://sendgrid.com/docs/API_Reference/Web_API_v3/IP_Management/ip_warmup_schedule.html) for more details on how SendGrid limits your email traffic for IPs in warmup.

        For more general information about warming up IPs, please see our [Classroom](https://sendgrid.com/docs/Classroom/Deliver/Delivery_Introduction/warming_up_ips.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/ip_warmup_response'
          examples:
            application/json:
              - ip: 0.0.0.0
                start_date: 1409616000
      security:
        - Authorization: []
    post:
      operationId: POST_ips-warmup
      summary: Add an IP to warmup
      tags:
        - IP Warmup
      description: |-
        **This endpoint allows you to enter an IP address into warmup mode.**

        SendGrid can automatically warm up dedicated IP addresses by limiting the amount of mail that can be sent through them per hour, with the limit determined by how long the IP address has been in warmup. See the [warmup schedule](https://sendgrid.com/docs/API_Reference/Web_API_v3/IP_Management/ip_warmup_schedule.html) for more details on how SendGrid limits your email traffic for IPs in warmup.

        For more general information about warming up IPs, please see our [Classroom](https://sendgrid.com/docs/Classroom/Deliver/Delivery_Introduction/warming_up_ips.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              ip:
                type: string
                description: The IP address that you want to begin warming up.
            example:
              ip: 0.0.0.0
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/ip_warmup_response'
          examples:
            application/json:
              - ip: 0.0.0.0
                start_date: 1409616000
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                description: The errors that were encountered.
                items:
                  type: object
                  properties:
                    field:
                      type: 'null'
                    message:
                      type: string
                      description: A message explaining why the IP couldn't entered into warmup mode.
          examples:
            application/json:
              errors:
                - field: null
                  message: resource not found
      security:
        - Authorization: []
  '/ips/warmup/{ip_address}':
    parameters:
      - name: ip_address
        in: path
        description: The IP address that you want to retrieve the warmup status for.
        required: true
        type: string
    get:
      operationId: GET_ips-warmup-ip_address
      summary: Retrieve warmup status for a specific IP address
      tags:
        - IP Warmup
      description: |-
        **This endpoint allows you to retrieve the warmup status for a specific IP address.**

        SendGrid can automatically warm up dedicated IP addresses by limiting the amount of mail that can be sent through them per hour, with the limit determined by how long the IP address has been in warmup. See the [warmup schedule](https://sendgrid.com/docs/API_Reference/Web_API_v3/IP_Management/ip_warmup_schedule.html) for more details on how SendGrid limits your email traffic for IPs in warmup.

        For more general information about warming up IPs, please see our [Classroom](https://sendgrid.com/docs/Classroom/Deliver/Delivery_Introduction/warming_up_ips.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/ip_warmup_response'
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                description: The errors that were encountered.
                items:
                  type: object
                  properties:
                    field:
                      type: 'null'
                    message:
                      type: string
                      description: A message explaining why the warmup status could not be retrieved.
          examples:
            application/json:
              errors:
                - field: null
                  message: resource not found
      security:
        - Authorization: []
    delete:
      operationId: DELETE_ips-warmup-ip_address
      summary: Remove an IP from warmup
      tags:
        - IP Warmup
      description: |-
        **This endpoint allows you to remove an IP address from warmup mode.**

        SendGrid can automatically warm up dedicated IP addresses by limiting the amount of mail that can be sent through them per hour, with the limit determined by how long the IP address has been in warmup. See the [warmup schedule](https://sendgrid.com/docs/API_Reference/Web_API_v3/IP_Management/ip_warmup_schedule.html) for more details on how SendGrid limits your email traffic for IPs in warmup.

        For more general information about warming up IPs, please see our [Classroom](https://sendgrid.com/docs/Classroom/Deliver/Delivery_Introduction/warming_up_ips.html).
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                description: The errors that were encountered.
                items:
                  type: object
                  properties:
                    field:
                      type: 'null'
                    message:
                      type: string
                      description: A message explaining why the IP couldn't be removed from warmup.
          examples:
            application/json:
              errors:
                - field: null
                  message: resource not found
      security:
        - Authorization: []
  /senders:
    post:
      operationId: POST_senders
      summary: Create a Sender Identity
      tags:
        - Sender Identities API
      description: |-
        **This endpoint allows you to create a new sender identity.**

        *You may create up to 100 unique sender identities.*

        Sender Identities are required to be verified before use. If your domain has been whitelabeled it will auto verify on creation. Otherwise an email will be sent to the \`from.email\`.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              nickname:
                type: string
                description: A nickname for the sender identity. Not used for sending.
              from:
                type: object
                properties:
                  email:
                    type: string
                    description: This is where the email will appear to originate from for your recipient
                  name:
                    type: string
                    description: This is the name appended to the from email field. IE - Your name or company name.
                required:
                  - email
              reply_to:
                type: object
                properties:
                  email:
                    type: string
                    description: This is the email that your recipient will reply to.
                  name:
                    type: string
                    description: This is the name appended to the reply to email field. IE - Your name or company name.
                required:
                  - email
              address:
                type: string
                description: The physical address of the sender identity.
              address_2:
                type: string
                description: Additional sender identity address information.
              city:
                type: string
                description: The city of the sender identity.
              state:
                type: string
                description: The state of the sender identity.
              zip:
                type: string
                description: The zipcode of the sender identity.
              country:
                type: string
                description: The country of the sender identity.
            required:
              - nickname
              - address
              - city
              - country
            example:
              nickname: My Sender ID
              from:
                email: from@example.com
                name: Example INC
              reply_to:
                email: replyto@example.com
                name: Example INC
              address: 123 Elm St.
              address_2: Apt. 456
              city: Denver
              state: Colorado
              zip: '80202'
              country: United States
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/senderID'
          examples:
            application/json:
              id: 1
              nickname: My Sender ID
              from:
                email: from@example.com
                name: Example INC
              reply_to:
                email: replyto@example.com
                name: Example INC
              address: 123 Elm St.
              address_2: Apt. 456
              city: Denver
              state: Colorado
              zip: '80202'
              country: United States
              verified: true
              updated_at: 1449872165
              created_at: 1449872165
              locked: false
        '400':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: The JSON you have submitted cannot be parsed.
                  field: ''
                - message: You've reached your limit of 100 sender identities. Please delete one or more and try again.
                  field: ''
                - message: nickname is required.
                  field: nickname
                - message: You already have a sender identity with the same nickname.
                  field: nickname
                - message: from_name is required.
                  field: from_name
                - message: from_email is required.
                  field: from_email
                - message: From email is not a valid email address.
                  field: from_email
                - message: reply_to is required.
                  field: reply_to
                - message: Reply to email is not a valid email address.
                  field: reply_to
                - message: address is required.
                  field: address
                - message: city is required.
                  field: city
                - message: country is required.
                  field: country
      security:
        - Authorization: []
    get:
      operationId: GET_v3-senders
      summary: Get all Sender Identities
      tags:
        - Sender Identities API
      description: |-
        **This endpoint allows you to retrieve a list of all sender identities that have been created for your account.**

        Sender Identities are required to be verified before use. If your domain has been whitelabeled it will auto verify on creation. Otherwise an email will be sent to the \`from.email\`.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                items:
                  $ref: '#/definitions/senderID'
          examples:
            application/json:
              result:
                - id: 1
                  nickname: My Sender ID
                  from:
                    email: from@example.com
                    name: Example INC
                  reply_to:
                    email: replyto@example.com
                    name: Example INC
                  address: 123 Elm St.
                  address_2: Apt. 456
                  city: Denver
                  state: Colorado
                  zip: '80202'
                  country: United States
                  verified: true
                  updated_at: 1449872165
                  created_at: 1449872165
                  locked: false
      security:
        - Authorization: []
  '/senders/{sender_id}':
    parameters:
      - name: sender_id
        in: path
        description: The ID of the sender identity that you want to update.
        required: true
        type: integer
    patch:
      operationId: PATCH_v3-senders-sender_id
      summary: Update a Sender Identity
      tags:
        - Sender Identities API
      description: |-
        **This endpoint allows you to update a sender identity.**

        Updates to \`from.email\` require re-verification. If your domain has been whitelabeled it will auto verify on creation. Otherwise an email will be sent to the \`from.email\`.

        Partial updates are allowed, but fields that are marked as "required" in the POST (create) endpoint must not be nil if that field is included in the PATCH request.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              nickname:
                type: string
                description: A nickname for the sender identity. Not used for sending.
              from:
                type: object
                properties:
                  email:
                    type: string
                    description: This is where the email will appear to originate from for your recipient
                  name:
                    type: string
                    description: This is the name appended to the from email field. IE - Your name or company name.
              reply_to:
                type: object
                properties:
                  email:
                    type: string
                    description: This is the email that your recipient will reply to.
                  name:
                    type: string
                    description: This is the name appended to the reply to email field. IE - Your name or company name.
              address:
                type: string
                description: The physical address of the sender identity.
              address_2:
                type: string
                description: Additional sender identity address information.
              city:
                type: string
                description: The city of the sender identity.
              state:
                type: string
                description: The state of the sender identity.
              zip:
                type: string
                description: The zipcode of the sender identity.
              country:
                type: string
                description: The country of the sender identity.
            example:
              nickname: My Sender ID
              from:
                email: from@example.com
                name: Example INC
              reply_to:
                email: replyto@example.com
                name: Example INC
              address: 123 Elm St.
              address_2: Apt. 456
              city: Denver
              state: Colorado
              zip: '80202'
              country: United States
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/senderID'
          examples:
            application/json:
              id: 1
              nickname: My Sender ID
              from:
                email: from@example.com
                name: Example INC
              reply_to:
                email: replyto@example.com
                name: Example INC
              address: 123 Elm St.
              address_2: Apt. 456
              city: Denver
              state: Colorado
              zip: '80202'
              country: United States
              verified: true
              updated_at: 1449872165
              created_at: 1449872165
              locked: false
        '400':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: The JSON you have submitted cannot be parsed.
                  field: ''
                - message: nickname is required.
                  field: nickname
                - message: You already have a sender identity with the same nickname.
                  field: nickname
                - message: from_name is required.
                  field: from_name
                - message: from_email is required.
                  field: from_email
                - message: From email is not a valid email address.
                  field: from_email
                - message: reply_to is required.
                  field: reply_to
                - message: Reply to email is not a valid email address.
                  field: reply_to
                - message: address is required.
                  field: address
                - message: city is required.
                  field: city
                - message: country is required.
                  field: country
        '403':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: You may only update a sender identity when it is unlocked.
                  field: locked
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: resource not found
                  field: id
      security:
        - Authorization: []
    delete:
      operationId: DELETE_v3-senders-sender_id
      summary: Delete a Sender Identity
      tags:
        - Sender Identities API
      description: |-
        **This endoint allows you to delete one of your sender identities.**

        Sender Identities are required to be verified before use. If your domain has been whitelabeled it will auto verify on creation. Otherwise an email will be sent to the \`from.email\`.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
        '403':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: You may only delete a sender identity when it is unlocked.
                  field: locked
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: resource not found
                  field: id
      security:
        - Authorization: []
    get:
      operationId: GET_v3-senders-sender_id
      summary: View a Sender Identity
      tags:
        - Sender Identities API
      description: |-
        **This endpoint allows you to retrieve a specific sender identity.**

        Sender Identities are required to be verified before use. If your domain has been whitelabeled it will auto verify on creation. Otherwise an email will be sent to the \`from.email\`.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/senderID'
          examples:
            application/json:
              id: 1
              nickname: My Sender ID
              from:
                email: from@example.com
                name: Example INC
              reply_to:
                email: replyto@example.com
                name: Example INC
              address: 123 Elm St.
              address_2: Apt. 456
              city: Denver
              state: Colorado
              zip: '80202'
              country: United States
              verified: true
              updated_at: 1449872165
              created_at: 1449872165
              locked: false
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: resource not found
                  field: id
      security:
        - Authorization: []
  '/senders/{sender_id}/resend_verification':
    parameters:
      - name: sender_id
        in: path
        description: The ID of the sender identity for which you would like to resend a verification email.
        required: true
        type: integer
    post:
      operationId: POST_v3-senders-sender_id-resend_verification
      summary: Resend Sender Identity Verification
      tags:
        - Sender Identities API
      description: |-
        **This enpdoint allows you to resend a sender identity verification email.**

        Sender Identities are required to be verified before use. If your domain has been whitelabeled it will auto verify on creation. Otherwise an email will be sent to the \`from.email\`.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
        '400':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: The Sender Identity is already verified.  No email sent.
                  field: ''
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: resource not found
                  field: id
      security:
        - Authorization: []
  /user/settings/enforced_tls:
    get:
      operationId: GET_user-settings-enforced_tls
      summary: Retrieve current Enforced TLS settings.
      tags:
        - Settings - Enforced TLS
      description: |-
        **This endpoint allows you to retrieve your current Enforced TLS settings.**

        The Enforced TLS settings specify whether or not the recipient is required to support TLS or have a valid certificate. See the [SMTP Ports User Guide](https://sendgrid.com/docs/Classroom/Basics/Email_Infrastructure/smtp_ports.html) for more information on opportunistic TLS.

        **Note:** If either setting is enabled and the recipient does not support TLS or have a valid certificate, we drop the message and send a block event with “TLS required but not supported” as the description.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              require_tls:
                type: boolean
                description: Indicates if the recipient is required to support TLS.
              require_valid_cert:
                type: boolean
                description: Indicates if the recipient is required to have a valid certificate.
            required:
              - require_tls
              - require_valid_cert
          examples:
            application/json:
              require_tls: false
              require_valid_cert: false
      security:
        - Authorization: []
    patch:
      operationId: PATCH_user-settings-enforced_tls
      summary: Update Enforced TLS settings
      tags:
        - Settings - Enforced TLS
      description: |-
        **This endpoint allows you to update your current Enforced TLS settings.**

        The Enforced TLS settings specify whether or not the recipient is required to support TLS or have a valid certificate. See the [SMTP Ports User Guide](https://sendgrid.com/docs/Classroom/Basics/Email_Infrastructure/smtp_ports.html) for more information on opportunistic TLS.

        **Note:** If either setting is enabled and the recipient does not support TLS or have a valid certificate, we drop the message and send a block event with “TLS required but not supported” as the description.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              require_tls:
                type: boolean
                description: 'Indicates if you want to require your recipients to support TLS. '
              require_valid_cert:
                type: boolean
                description: Indicates if you want to require your recipients to have a valid certificate.
            example:
              require_tls: true
              require_valid_cert: false
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              require_tls:
                type: boolean
                description: Indicates if your recipients are required to support TLS.
              require_valid_cert:
                type: boolean
                description: Indicates if your recipients are required to have a valid certificate.
            required:
              - require_tls
              - require_valid_cert
          examples:
            application/json:
              require_tls: true
              require_valid_cert: false
      security:
        - Authorization: []
  /user/webhooks/parse/settings:
    post:
      operationId: POST_user-webhooks-parse-settings
      summary: Create a parse setting
      tags:
        - Settings - Inbound Parse
      description: |-
        **This endpoint allows you to create a new inbound parse setting.**

        The inbound parse webhook allows you to have incoming emails parsed, extracting some or all of the content, and then have that content POSTed by SendGrid to a URL of your choosing. For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Webhooks/parse.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/parse-setting'
            example:
              hostname: myhostname.com
              url: 'http://email.myhosthame.com'
              spam_check: true
              send_raw: false
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/parse-setting'
          examples:
            application/json:
              url: 'http://email.myhostname.com'
              hostname: myhostname.com
              spam_check: false
              send_raw: true
      security:
        - Authorization: []
    get:
      operationId: GET_user-webhooks-parse-settings
      summary: Retrieve all parse settings
      tags:
        - Settings - Inbound Parse
      description: |-
        **This endpoint allows you to retrieve all of your current inbound parse settings.**

        The inbound parse webhook allows you to have incoming emails parsed, extracting some or all of the contnet, and then have that content POSTed by SendGrid to a URL of your choosing. For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Webhooks/parse.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                description: The list of your current inbound parse settings.
                items:
                  $ref: '#/definitions/parse-setting'
          examples:
            application/json:
              result:
                - url: 'http://mydomain.com/parse'
                  hostname: mail.mydomain.com
                  spam_check: true
                  send_raw: true
      security:
        - Authorization: []
  '/user/webhooks/parse/settings/{hostname}':
    parameters:
      - name: hostname
        in: path
        description: The hostname associated with the inbound parse setting that you would like to retrieve.
        required: true
        type: string
    get:
      operationId: GET_user-webhooks-parse-settings-hostname
      summary: Retrieve a specific parse setting
      tags:
        - Settings - Inbound Parse
      description: |-
        **This endpoint allows you to retrieve a specific inbound parse setting.**

        The inbound parse webhook allows you to have incoming emails parsed, extracting some or all of the contnet, and then have that content POSTed by SendGrid to a URL of your choosing. For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Webhooks/parse.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/parse-setting'
          examples:
            application/json:
              url: 'http://mydomain.com/parse'
              hostname: mail.mydomain.com
              spam_check: true
              send_raw: true
      security:
        - Authorization: []
    patch:
      operationId: PATCH_user-webhooks-parse-settings-hostname
      summary: Update a parse setting
      tags:
        - Settings - Inbound Parse
      description: |-
        **This endpoint allows you to update a specific inbound parse setting.**

        The inbound parse webhook allows you to have incoming emails parsed, extracting some or all of the contnet, and then have that content POSTed by SendGrid to a URL of your choosing. For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Webhooks/parse.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/parse-setting'
            example:
              url: 'http://newdomain.com/parse'
              spam_check: false
              send_raw: true
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/parse-setting'
          examples:
            application/json:
              url: 'http://mydomain.com/parse'
              hostname: mail.mydomain.com
              spam_check: true
              send_raw: true
      security:
        - Authorization: []
    delete:
      operationId: DELETE_user-webhooks-parse-settings-hostname
      summary: Delete a parse setting
      tags:
        - Settings - Inbound Parse
      description: |-
        **This endpoint allows you to delete a specific inbound parse setting.**

        The inbound parse webhook allows you to have incoming emails parsed, extracting some or all of the contnet, and then have that content POSTed by SendGrid to a URL of your choosing. For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Webhooks/parse.html).
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
      security:
        - Authorization: []
  /mail_settings:
    get:
      operationId: GET_mail_settings
      summary: Retrieve all mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to retrieve a list of all mail settings.**

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: The number of settings to return.
          type: integer
        - name: offset
          in: query
          description: Where in the list of results to begin displaying settings.
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                description: The list of all mail settings.
                items:
                  type: object
                  properties:
                    title:
                      type: string
                      description: The title of the mail setting.
                    enabled:
                      type: boolean
                      description: Indicates if this mail setting is currently enabled.
                    name:
                      type: string
                      description: The name of the mail setting.
                    description:
                      type: string
                      description: A description of the mail setting.
                  required:
                    - title
                    - enabled
                    - name
                    - description
            required:
              - result
          examples:
            application/json:
              result:
                - title: Address Whitelist
                  enabled: false
                  name: address_whitelist
                  description: Address / domains that should never have email suppressed.
                - title: BCC
                  enabled: false
                  name: bcc
                  description: Automatically BCC an address for every e-mail sent.
                - title: Bounce Purge
                  enabled: false
                  name: bounce_purge
                  description: Allows you to automatically purge bounce records from SendGrid after a specified number of days.
                - title: Event Notification
                  enabled: true
                  name: event_notify
                  description: 'Controls notifications for events, such as bounces, clicks, and opens.'
                - title: Footer
                  enabled: false
                  name: footer
                  description: Allows you to add a custom footer to outgoing email.
                - title: Forward Bounce
                  enabled: true
                  name: forward_bounce
                  description: Allows you to forward bounces to a specific email address.
                - title: Forward Spam
                  enabled: false
                  name: forward_spam
                  description: Allows for a copy of spam reports to be forwarded to an email address.
                - title: Legacy Email Template
                  enabled: true
                  name: template
                  description: Allows you to customize your outgoing HTML emails.
                - title: Plain Content
                  enabled: false
                  name: plain_content
                  description: Convert your plain text emails to HTML.
                - title: Spam Checker
                  enabled: true
                  name: spam_check
                  description: Check outbound messages for spam content.
      security:
        - Authorization: []
  /mail_settings/bcc:
    get:
      operationId: GET_mail_settings-bcc
      summary: Retrieve all BCC mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to retrieve your current BCC mail settings.**

        When the BCC mail setting is enabled, SendGrid will automatically send a blind carbon copy (BCC) to an address for every email sent without adding that address to the header. Please note that only one email address may be entered in this field, if you wish to distribute BCCs to multiple addresses you will need to create a distribution group or use forwarding rules.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_bcc'
          examples:
            application/json:
              email: example@example.com
              enabled: false
      security:
        - Authorization: []
    patch:
      operationId: PATCH_mail_settings-bcc
      summary: Update BCC mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to update your current BCC mail settings.**

        When the BCC mail setting is enabled, SendGrid will automatically send a blind carbon copy (BCC) to an address for every email sent without adding that address to the header. Please note that only one email address may be entered in this field, if you wish to distribute BCCs to multiple addresses you will need to create a distribution group or use forwarding rules.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/mail_settings_patch'
            example:
              enabled: false
              email: email@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_patch'
          examples:
            application/json:
              email: example@example.com
              enabled: false
      security:
        - Authorization: []
  /mail_settings/address_whitelist:
    get:
      operationId: GET_mail_settings-address_whitelist
      summary: Retrieve address whitelist mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to retrieve your current email address whitelist settings.**

        The address whitelist setting whitelists a specified email address or domain for which mail should never be suppressed. For example, you own the domain “example.com,” and one or more of your recipients use email@example.com addresses, by placing example.com in the address whitelist setting, all bounces, blocks, and unsubscribes logged for that domain will be ignored and sent as if under normal sending conditions.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_address_whitelabel'
          examples:
            application/json:
              enabled: false
              list:
                - example.com
      security:
        - Authorization: []
    patch:
      operationId: PATCH_mail_settings-address_whitelist
      summary: Update address whitelist mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to update your current email address whitelist settings.**

        The address whitelist setting whitelists a specified email address or domain for which mail should never be suppressed. For example, you own the domain “example.com,” and one or more of your recipients use email@example.com addresses, by placing example.com in the address whitelist setting, all bounces, blocks, and unsubscribes logged for that domain will be ignored and sent as if under normal sending conditions.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              enabled:
                type: boolean
                description: Indicates if your email address whitelist is enabled.
              list:
                type: array
                description: 'Either a single email address that you want whitelisted or a domain, for which all email addresses belonging to this domain will be whitelisted.'
                items:
                  type: string
            example:
              enabled: true
              list:
                - email1@example.com
                - example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_address_whitelabel'
          examples:
            application/json:
              enabled: true
              list:
                - email1@example.com
      security:
        - Authorization: []
  /mail_settings/footer:
    get:
      operationId: GET_mail_settings-footer
      summary: Retrieve footer mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to retrieve your current Footer mail settings.**

        The footer setting will insert a custom footer at the bottom of the text and HTML bodies. Use the embedded HTML editor and plain text entry fields to create the content of the footers to be inserted into your emails.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_footer'
          examples:
            application/json:
              enabled: true
              html_content: Example HTML content
              plain_content: Example plain content
      security:
        - Authorization: []
    patch:
      operationId: PATCH_mail_settings-footer
      summary: Update footer mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to update your current Footer mail settings.**

        The footer setting will insert a custom footer at the bottom of the text and HTML bodies. Use the embedded HTML editor and plain text entry fields to create the content of the footers to be inserted into your emails.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/mail_settings_footer'
            example:
              enabled: true
              html_content: ...
              plain_content: ...
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_footer'
          examples:
            application/json:
              enabled: true
              html_content: Example HTML content
              plain_content: Example plain content
      security:
        - Authorization: []
  /mail_settings/forward_spam:
    get:
      operationId: GET_mail_settings-forward_spam
      summary: Retrieve forward spam mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to retrieve your current Forward Spam mail settings.**

        Enabling the forward spam setting allows you to specify an email address to which spam reports will be forwarded.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_forward_spam'
          examples:
            application/json:
              email: ''
              enabled: true
      security:
        - Authorization: []
    patch:
      operationId: PATCH_mail_settings-forward_spam
      summary: Update forward spam mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to update your current Forward Spam mail settings.**

        Enabling the forward spam setting allows you to specify an email address to which spam reports will be forwarded.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/mail_settings_forward_spam'
            example:
              email: ''
              enabled: false
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_forward_spam'
          examples:
            application/json:
              email: ''
              enabled: false
      security:
        - Authorization: []
  /mail_settings/plain_content:
    get:
      operationId: GET_mail_settings-plain_content
      summary: Retrieve plain content mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to retrieve your current Plain Content mail settings.**

        The plain content setting will automatically convert any plain text emails that you send to HTML before sending.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              enabled:
                type: boolean
                description: Indicates if the Plain Content mail setting is enabled.
          examples:
            application/json:
              enabled: false
      security:
        - Authorization: []
    patch:
      operationId: PATCH_mail_settings-plain_content
      summary: Update plain content mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to update your current Plain Content mail settings.**

        The plain content setting will automatically convert any plain text emails that you send to HTML before sending.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              enabled:
                type: boolean
                description: The new setting you would like to use for your Plain Content mail setting.
            example:
              enabled: false
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              enabled:
                type: boolean
                description: Indicates if your Plain Content mail setting is enabled.
          examples:
            application/json:
              enabled: false
      security:
        - Authorization: []
  /mail_settings/spam_check:
    get:
      operationId: GET_mail_settings-spam_check
      summary: Retrieve spam check mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to retrieve your current Spam Checker mail settings.**

        The spam checker filter notifies you when emails are detected that exceed a predefined spam threshold.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_spam_check'
          examples:
            application/json:
              enabled: false
              max_score: 6
              url: 'http://example.com'
      security:
        - Authorization: []
    patch:
      operationId: PATCH_mail_settings-spam_check
      summary: Update spam check mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to update your current spam checker mail settings.**

        The spam checker filter notifies you when emails are detected that exceed a predefined spam threshold.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              enabled:
                type: boolean
                description: Indicates if you want the spam check mail setting to be enabled or not.
              url:
                type: string
                description: The Inbound Parse URL where you would like your spam reports to be sent to.
              max_score:
                type: integer
                default: 5
                description: 'The new max score, or spam threshold that you would like to set for the spam checker.'
                minimum: 1
                maximum: 10
            example:
              enabled: true
              url: url
              max_score: 5
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_spam_check'
          examples:
            application/json:
              enabled: false
              max_score: 6
              url: 'http://example.com'
      security:
        - Authorization: []
  /mail_settings/template:
    get:
      operationId: GET_mail_settings-template
      summary: Retrieve legacy template mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to retrieve your current legacy email template settings.**

        This setting refers to our original email templates. We currently support more fully featured [transactional templates](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

        The legacy email template setting wraps an HTML template around your email content. This can be useful for sending out marketing email and/or other HTML formatted messages.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_template'
          examples:
            application/json:
              enabled: false
              html_content: |
                <p><% body %>Example</p>
      security:
        - Authorization: []
    patch:
      operationId: PATCH_mail_settings-template
      summary: Update template mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to update your current legacy email template settings.**

        This setting refers to our original email templates. We currently support more fully featured [transactional templates](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

        The legacy email template setting wraps an HTML template around your email content. This can be useful for sending out marketing email and/or other HTML formatted messages.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              enabled:
                type: boolean
                description: Indicates if you want to enable the legacy email template mail setting.
              html_content:
                type: string
                description: The new HTML content for your legacy email template.
            example:
              enabled: true
              html_content: <% body %>
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              enabled:
                type: boolean
                description: Indicates if the legacy email template mail setting is enabled.
              html_content:
                type: string
                description: The HTML content of your legacy email template.
            required:
              - enabled
              - html_content
          examples:
            application/json:
              enabled: false
              html_content: |
                <p><% body %>Example</p>
      security:
        - Authorization: []
  /mail_settings/bounce_purge:
    get:
      operationId: GET_mail_settings-bounce_purge
      summary: Retrieve bounce purge mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to retrieve your current bounce purge settings.**

        This setting allows you to set a schedule for SendGrid to automatically delete contacts from your soft and hard bounce suppression lists.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_bounce_purge'
          examples:
            application/json:
              enabled: false
              soft_bounces: 1234
              hard_bounces: null
      security:
        - Authorization: []
    patch:
      operationId: PATCH_mail_settings-bounce_purge
      summary: Update bounce purge mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to update your current bounce purge settings.**

        This setting allows you to set a schedule for SendGrid to automatically delete contacts from your soft and hard bounce suppression lists.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/mail_settings_bounce_purge'
            example:
              enabled: true
              hard_bounces: 5
              soft_bounces: 5
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_bounce_purge'
          examples:
            application/json:
              enabled: false
              hard_bounces: null
              soft_bounces: null
      security:
        - Authorization: []
  /mail_settings/forward_bounce:
    get:
      operationId: GET_mail_settings-forward_bounce
      summary: Retrieve forward bounce mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to retrieve your current bounce forwarding mail settings.**

        Activating this setting allows you to specify an email address to which bounce reports are forwarded.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_forward_bounce'
          examples:
            application/json:
              enabled: false
              email: null
      security:
        - Authorization: []
    patch:
      operationId: PATCH_mail_settings-forward_bounce
      summary: Update forward bounce mail settings
      tags:
        - Settings - Mail
      description: |-
        **This endpoint allows you to update your current bounce forwarding mail settings.**

        Activating this setting allows you to specify an email address to which bounce reports are forwarded.

        Mail settings allow you to tell SendGrid specific things to do to every email that you send to your recipients over SendGrid’s [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/mail_settings_forward_bounce'
            example:
              enabled: true
              email: example@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/mail_settings_forward_bounce'
          examples:
            application/json:
              email: ''
              enabled: true
      security:
        - Authorization: []
  /partner_settings:
    get:
      operationId: GET_partner_settings
      summary: Returns a list of all partner settings.
      tags:
        - Settings - Partner
      description: |-
        **This endpoint allows you to retrieve a list of all partner settings that you can enable.**

        Our partner settings allow you to integrate your SendGrid account with our partners to increase your SendGrid experience and functionality. For more information about our partners, and how you can begin integrating with them, please visit our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/partners.html).
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: The number of settings to return per page.
          type: integer
        - name: offset
          in: query
          description: The paging offset.
          type: integer
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                items:
                  type: object
                  properties:
                    title:
                      type: string
                      description: The title of the partner.
                    enabled:
                      type: boolean
                      description: Indicates if this partner setting has been enabled.
                    name:
                      type: string
                      description: The name of the partner setting.
                    description:
                      type: string
                      description: A description of this partner setting.
                  required:
                    - title
                    - enabled
                    - name
                    - description
          examples:
            application/json:
              result:
                - title: Partner title
                  enabled: true
                  name: partner_name
                  description: A description of a partner.
      security:
        - Authorization: []
  /partner_settings/new_relic:
    get:
      operationId: GET_partner_settings-new_relic
      summary: Returns all New Relic partner settings.
      tags:
        - Settings - Partner
      description: |-
        **This endpoint allows you to retrieve your current New Relic partner settings.**

        Our partner settings allow you to integrate your SendGrid account with our partners to increase your SendGrid experience and functionality. For more information about our partners, and how you can begin integrating with them, please visit our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/partners.html).

        By integrating with New Relic, you can send your SendGrid email statistics to your New Relic Dashboard. If you enable this setting, your stats will be sent to New Relic every 5 minutes. You will need your New Relic License Key to enable this setting. For more information, please see our [Classroom](https://sendgrid.com/docs/Classroom/Track/Collecting_Data/new_relic.html).
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/partner_settings_new_relic'
          examples:
            application/json:
              enable_subuser_statistics: false
              enabled: true
              license_key: ''
      security:
        - Authorization: []
    patch:
      operationId: PATCH_partner_settings-new_relic
      summary: Updates New Relic partner settings.
      tags:
        - Settings - Partner
      description: |-
        **This endpoint allows you to update or change your New Relic partner settings.**

        Our partner settings allow you to integrate your SendGrid account with our partners to increase your SendGrid experience and functionality. For more information about our partners, and how you can begin integrating with them, please visit our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/partners.html).

        By integrating with New Relic, you can send your SendGrid email statistics to your New Relic Dashboard. If you enable this setting, your stats will be sent to New Relic every 5 minutes. You will need your New Relic License Key to enable this setting. For more information, please see our [Classroom](https://sendgrid.com/docs/Classroom/Track/Collecting_Data/new_relic.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              license_key:
                type: string
                description: The license key for your New Relic account.
              enabled:
                type: boolean
                description: Indicates if this partner setting is enabled.
              enable_subuser_statistics:
                type: boolean
                description: Indicates if your subuser statistics will be sent to your New Relic Dashboard.
            example:
              license_key: ''
              enabled: true
              enable_subuser_statistics: true
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/partner_settings_new_relic'
          examples:
            application/json:
              enable_subuser_statistics: true
              enabled: true
              license_key: ''
      security:
        - Authorization: []
  /tracking_settings:
    get:
      operationId: GET_tracking_settings
      summary: Retrieve Tracking Settings
      tags:
        - Settings - Tracking
      description: |-
        **This endpoint allows you to retrieve a list of all tracking settings that you can enable on your account.**

        You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

        For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: The number of settings to return.
          type: integer
        - name: offset
          in: query
          description: Where in the list of results you want to begin retrieving settings.
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                description: The list of all tracking settings.
                items:
                  type: object
                  properties:
                    name:
                      type: string
                      description: The name of the event being tracked.
                    title:
                      type: string
                      description: The title of the tracking setting.
                    description:
                      type: string
                      description: A description about the event that is being tracked.
                    enabled:
                      type: boolean
                      description: Indicates if this tracking setting is currently enabled.
          examples:
            application/json:
              result:
                - name: open
                  title: Open Tracking
                  description: lorem ipsum... .
                  enabled: true
      security:
        - Authorization: []
  /tracking_settings/click:
    get:
      operationId: GET_tracking_settings-click
      summary: Retrieve Click Track Settings
      tags:
        - Settings - Tracking
      description: |-
        **This endpoint allows you to retrieve your current click tracking setting.**

        You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

        For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              enable_text:
                type: boolean
                description: Indicates if click tracking is enabled for plain text emails.
              enabled:
                type: boolean
                description: Indicates if click tracking is enabled or disabled.
            required:
              - enable_text
              - enabled
          examples:
            application/json:
              enable_text: false
              enabled: true
      security:
        - Authorization: []
    patch:
      operationId: PATCH_tracking_settings-click
      summary: Update Click Tracking Settings
      tags:
        - Settings - Tracking
      description: |-
        **This endpoint allows you to change your current click tracking setting. You can enable, or disable, click tracking using this endpoint.**

        You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

        For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              enabled:
                type: boolean
                description: The setting you want to use for click tracking.
            example:
              enabled: true
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              enable_text:
                type: boolean
                description: Indicates if click tracking is enabled for plain text emails
              enabled:
                type: boolean
                description: The new setting new setting for click tracking.
            required:
              - enable_text
              - enabled
          examples:
            application/json:
              enable_text: false
              enabled: true
      security:
        - Authorization: []
  /tracking_settings/google_analytics:
    get:
      operationId: GET_tracking_settings-google_analytics
      summary: Retrieve Google Analytics Settings
      tags:
        - Settings - Tracking
      description: |-
        **This endpoint allows you to retrieve your current setting for Google Analytics.**

        For more information about using Google Analytics, please refer to [Google’s URL Builder](https://support.google.com/analytics/answer/1033867?hl=en) and their article on ["Best Practices for Campaign Building"](https://support.google.com/analytics/answer/1037445).

        We default the settings to Google’s recommendations. For more information, see [Google Analytics Demystified](https://sendgrid.com/docs/Classroom/Track/Collecting_Data/google_analytics_demystified_ga_statistics_vs_sg_statistics.html).

        You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

        For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/google_analytics_settings'
          examples:
            application/json:
              enabled: true
              utm_campaign: ''
              utm_content: lotsandlotsofcontent
              utm_medium: ''
              utm_source: ''
              utm_term: ''
      security:
        - Authorization: []
    patch:
      operationId: PATCH_tracking_settings-google_analytics
      summary: Update Google Analytics Settings
      tags:
        - Settings - Tracking
      description: |-
        **This endpoint allows you to update your current setting for Google Analytics.**

        For more information about using Google Analytics, please refer to [Google’s URL Builder](https://support.google.com/analytics/answer/1033867?hl=en) and their article on ["Best Practices for Campaign Building"](https://support.google.com/analytics/answer/1037445).

        We default the settings to Google’s recommendations. For more information, see [Google Analytics Demystified](https://sendgrid.com/docs/Classroom/Track/Collecting_Data/google_analytics_demystified_ga_statistics_vs_sg_statistics.html).

        You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

        For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/google_analytics_settings'
            example:
              enabled: true
              utm_source: sendgrid.com
              utm_medium: email
              utm_term: ''
              utm_content: ''
              utm_campaign: website
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/google_analytics_settings'
          examples:
            application/json:
              enabled: true
              utm_campaign: ''
              utm_content: lotsandlotsofcontent
              utm_medium: ''
              utm_source: ''
              utm_term: ''
      security:
        - Authorization: []
  /tracking_settings/open:
    get:
      operationId: GET_tracking_settings-open
      summary: Get Open Tracking Settings
      tags:
        - Settings - Tracking
      description: |-
        **This endpoint allows you to retrieve your current settings for open tracking.**

        Open Tracking adds an invisible image at the end of the email which can track email opens. If the email recipient has images enabled on their email client, a request to SendGrid’s server for the invisible image is executed and an open event is logged. These events are logged in the Statistics portal, Email Activity interface, and are reported by the Event Webhook.

        You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

        For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              enabled:
                type: boolean
                description: Indicates if open tracking is enabled.
            required:
              - enabled
          examples:
            application/json:
              enabled: true
      security:
        - Authorization: []
    patch:
      operationId: PATCH_tracking_settings-open
      summary: Update Open Tracking Settings
      tags:
        - Settings - Tracking
      description: |-
        **This endpoint allows you to update your current settings for open tracking.**

        Open Tracking adds an invisible image at the end of the email which can track email opens. If the email recipient has images enabled on their email client, a request to SendGrid’s server for the invisible image is executed and an open event is logged. These events are logged in the Statistics portal, Email Activity interface, and are reported by the Event Webhook.

        You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

        For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              enabled:
                type: boolean
                description: The new status that you want to set for open tracking.
            example:
              enabled: true
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              enabled:
                type: boolean
                description: Indicates if open tracking is enabled.
            required:
              - enabled
          examples:
            application/json:
              enabled: true
      security:
        - Authorization: []
  /tracking_settings/subscription:
    get:
      operationId: GET_tracking_settings-subscription
      summary: Retrieve Subscription Tracking Settings
      tags:
        - Settings - Tracking
      description: |-
        **This endpoint allows you to retrieve your current settings for subscription tracking.**

        Subscription tracking adds links to the bottom of your emails that allows your recipients to subscribe to, or unsubscribe from, your emails.

        You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

        For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/subscription_tracking_settings'
          examples:
            application/json:
              enabled: true
              html_content: |
                <p>Something something unsubscribe <% %> something something</p>
              landing: |
                <p>subscribehere</p>
              plain_content: Something something unsubscribe <% %> something something
              replace: thetag
              url: ''
      security:
        - Authorization: []
    patch:
      operationId: PATCH_tracking_settings-subscription
      summary: Update Subscription Tracking Settings
      tags:
        - Settings - Tracking
      description: |-
        **This endpoint allows you to update your current settings for subscription tracking.**

        Subscription tracking adds links to the bottom of your emails that allows your recipients to subscribe to, or unsubscribe from, your emails.

        You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

        For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/subscription_tracking_settings'
            example:
              enabled: true
              landing: landing page html
              url: url
              replace: replacement tag
              html_content: html content
              plain_content: text content
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/subscription_tracking_settings'
          examples:
            application/json:
              enabled: true
              landing: landing page html
              url: url
              replace: replacement tag
              html_content: html content
              plain_content: text content
      security:
        - Authorization: []
  /suppression/spam_reports:
    get:
      operationId: GET_suppression-spam_reports
      summary: Retrieve all spam reports
      tags:
        - Spam Reports API
      description: |-
        **This endpoint allows you to retrieve all spam reports.**

        [Spam reports](https://sendgrid.com/docs/Glossary/spam_reports.html) happen when a recipient indicates that they think your email is [spam](https://sendgrid.com/docs/Glossary/spam.html) and then their email provider reports this to SendGrid.

        For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/spam_reports.html).
      produces:
        - application/json
      parameters:
        - name: start_time
          in: query
          description: Refers start of the time range in unix timestamp when a spam report was created (inclusive).
          type: integer
        - name: end_time
          in: query
          description: Refers end of the time range in unix timestamp when a spam report was created (inclusive).
          type: integer
        - name: limit
          in: query
          description: Limit the number of results to be displayed per page.
          type: integer
        - name: offset
          in: query
          description: Paging offset. The point in the list to begin displaying results.
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                created:
                  type: integer
                  description: A Unix timestamp indicating when the spam report was made.
                email:
                  type: string
                  description: The email address of the recipient who marked your message as spam.
                ip:
                  type: string
                  description: The IP address that the message was sent on.
              required:
                - created
                - email
                - ip
          examples:
            application/json:
              - created: 1443651141
                email: user1@example.com
                ip: 10.63.202.100
              - created: 1443651154
                email: user2@example.com
                ip: 10.63.202.100
      security:
        - Authorization: []
    delete:
      operationId: DELETE_suppression-spam_reports
      summary: Delete spam reports
      tags:
        - Spam Reports API
      description: |-
        **This endpoint allows you to delete your spam reports.**

        There are two options for deleting spam reports:

        1) You can delete all spam reports by setting "delete_all" to true in the request body.
        2) You can delete some spam reports by specifying the email addresses in an array in the request body.

        [Spam reports](https://sendgrid.com/docs/Glossary/spam_reports.html) happen when a recipient indicates that they think your email is [spam](https://sendgrid.com/docs/Glossary/spam.html) and then their email provider reports this to SendGrid.

        For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/spam_reports.html).
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              delete_all:
                type: boolean
                description: Indicates if you want to delete all email addresses on the spam report list.
              emails:
                type: array
                description: A list of specific email addresses that you want to remove from the spam report list.
                items:
                  type: string
            example:
              delete_all: false
              emails:
                - example1@example.com
                - example2@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
      security:
        - Authorization: []
  '/suppression/spam_reports/{email}':
    parameters:
      - name: email
        in: path
        description: The email address of a specific spam report that you want to retrieve.
        required: true
        type: string
    get:
      operationId: GET_suppression-spam_reports-email
      summary: Retrieve a specific spam report
      tags:
        - Spam Reports API
      description: |-
        **This endpoint allows you to retrieve a specific spam report.**

        [Spam reports](https://sendgrid.com/docs/Glossary/spam_reports.html) happen when a recipient indicates that they think your email is [spam](https://sendgrid.com/docs/Glossary/spam.html) and then their email provider reports this to SendGrid.

        For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/spam_reports.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                created:
                  type: integer
                  description: A Unix timestamp that indicates when the recipient marked your message as spam.
                email:
                  type: string
                  description: The email address of the recipient that marked your message as spam.
                ip:
                  type: string
                  description: The IP address that the message was sent from.
              required:
                - created
                - email
                - ip
          examples:
            application/json:
              - created: 1454433146
                email: test1@example.com
                ip: 10.89.32.5
      security:
        - Authorization: []
    delete:
      operationId: DELETE_suppression-spam_reports-email
      summary: Delete a specific spam report
      tags:
        - Spam Reports API
      description: |-
        **This endpoint allows you to delete a specific spam report.**

        [Spam reports](https://sendgrid.com/docs/Glossary/spam_reports.html) happen when a recipient indicates that they think your email is [spam](https://sendgrid.com/docs/Glossary/spam.html) and then their email provider reports this to SendGrid.

        For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/spam_reports.html).
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
      security:
        - Authorization: []
  /stats:
    get:
      operationId: GET_stats
      summary: Retrieve global email statistics
      tags:
        - Stats
      description: |-
        **This endpoint allows you to retrieve all of your global email statistics between a given date range.**

        Parent accounts will see aggregated stats for their account and all subuser accounts. Subuser accounts will only see their own stats.
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: The number of results to return.
          required: false
          type: integer
        - name: offset
          in: query
          description: The point in the list to begin retrieving results.
          required: false
          type: integer
        - name: aggregated_by
          in: query
          description: 'How to group the statistics. Must be either "day", "week", or "month".'
          required: false
          type: string
          enum:
            - day
            - week
            - month
        - name: start_date
          in: query
          description: The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.
          required: true
          type: string
        - name: end_date
          in: query
          description: The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.
          required: false
          type: string
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                date:
                  type: string
                  description: The date the stats were gathered.
                stats:
                  type: array
                  description: The individual email activity stats.
                  items:
                    type: object
                    properties:
                      metrics:
                        type: object
                        properties:
                          blocks:
                            type: integer
                            description: The number of emails that were not allowed to be delivered by ISPs.
                          bounce_drops:
                            type: integer
                            description: The number of emails that were dropped because of a bounce.
                          bounces:
                            type: integer
                            description: The number of emails that bounced instead of being delivered.
                          clicks:
                            type: integer
                            description: The number of links that were clicked in your emails.
                          deferred:
                            type: integer
                            description: 'The number of emails that temporarily could not be delivered. '
                          delivered:
                            type: integer
                            description: The number of emails SendGrid was able to confirm were actually delivered to a recipient.
                          invalid_emails:
                            type: integer
                            description: The number of recipients who had malformed email addresses or whose mail provider reported the address as invalid.
                          opens:
                            type: integer
                            description: The total number of times your emails were opened by recipients.
                          processed:
                            type: integer
                            description: 'Requests from your website, application, or mail client via SMTP Relay or the API that SendGrid processed.'
                          requests:
                            type: integer
                            description: The number of emails that were requested to be delivered.
                          spam_report_drops:
                            type: integer
                            description: The number of emails that were dropped due to a recipient previously marking your emails as spam.
                          spam_reports:
                            type: integer
                            description: The number of recipients who marked your email as spam.
                          unique_clicks:
                            type: integer
                            description: The number of unique recipients who clicked links in your emails.
                          unique_opens:
                            type: integer
                            description: The number of unique recipients who opened your emails.
                          unsubscribe_drops:
                            type: integer
                            description: The number of emails dropped due to a recipient unsubscribing from your emails.
                          unsubscribes:
                            type: integer
                            description: The number of recipients who unsubscribed from your emails.
              required:
                - date
                - stats
          examples:
            application/json:
              - date: '2015-11-03'
                stats:
                  - metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-11-04'
                stats:
                  - metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-11-05'
                stats:
                  - metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-11-06'
                stats:
                  - metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-11-07'
                stats:
                  - metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-11-08'
                stats:
                  - metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-11-09'
                stats:
                  - metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
      security:
        - Authorization: []
  /geo/stats:
    get:
      operationId: GET_geo-stats
      summary: Retrieve email statistics by country and state/province.
      tags:
        - Stats
      description: |-
        **This endpoint allows you to retrieve your email statistics segmented by country and state/province.**

        **We only store up to 7 days of email activity in our database.** By default, 500 items will be returned per request via the Advanced Stats API endpoints.

        Advanced Stats provide a more in-depth view of your email statistics and the actions taken by your recipients. You can segment these statistics by geographic location, device type, client type, browser, and mailbox provider. For more information about statistics, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/index.html).
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: How many results to include on each page.
          required: false
          type: integer
        - name: offset
          in: query
          description: How many results to exclude.
          required: false
          type: integer
        - name: aggregated_by
          in: query
          description: 'How you would like the statistics to be grouped. Must be either "day", "week", or "month".'
          required: false
          type: string
          enum:
            - day
            - week
            - month
        - name: start_date
          in: query
          description: The starting date of the statistics to retrieve. Must be in format YYYY-MM-DD
          required: true
          type: string
        - name: end_date
          in: query
          description: 'The end date of the statistics to retrieve. '
          required: false
          type: string
          default: The date the request is made.
        - name: country
          in: query
          description: The country you would like to see statistics for. Currently only supported for US and CA.
          required: false
          type: string
          enum:
            - US
            - CA
        - $ref: '#/parameters/trait:authorizationHeader:Authorization'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/advanced_stats_country'
          examples:
            application/json:
              - date: '2015-10-11'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-12'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-13'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-14'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-15'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-16'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-17'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-18'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-19'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-20'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-21'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 1
                      unique_clicks: 0
                      unique_opens: 1
              - date: '2015-10-22'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-23'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-24'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-25'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-26'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-27'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-28'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-29'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-30'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-31'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-01'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-02'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-03'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-04'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-05'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-06'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-07'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-08'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-09'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-10'
                stats:
                  - type: province
                    name: TX
                    metrics:
                      clicks: 0
                      opens: 0
                      unique_clicks: 0
                      unique_opens: 0
  /devices/stats:
    get:
      operationId: GET_devices-stats
      summary: Retrieve email statistics by device type.
      tags:
        - Stats
      produces:
        - application/json
      parameters:
        - name: end_date
          in: query
          description: The end date of the statistics to retrieve. Defaults to today.
          required: false
          type: string
        - name: limit
          in: query
          description: How many results to include on each page.
          required: false
          type: integer
        - name: offset
          in: query
          description: How many results to exclude.
          required: false
          type: integer
        - name: aggregated_by
          in: query
          description: 'How to group the statistics. Must be either "day", "week", or "month".'
          required: false
          type: string
        - name: start_date
          in: query
          description: The starting date of the statistics to retrieve.
          required: true
          type: string
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/advanced_stats_opens'
          examples:
            application/json:
              - date: '2015-10-11'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-12'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-13'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-14'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-15'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-16'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-17'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-18'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-19'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-20'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-21'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 1
                      unique_opens: 1
              - date: '2015-10-22'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-23'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-24'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-25'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-26'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 2
                      unique_opens: 2
              - date: '2015-10-27'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-28'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-29'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-30'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-10-31'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-11-01'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-11-02'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-11-03'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-11-04'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-11-05'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-11-06'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-11-07'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-11-08'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-11-09'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
              - date: '2015-11-10'
                stats:
                  - type: device
                    name: Webmail
                    metrics:
                      opens: 0
                      unique_opens: 0
      security:
        - Authorization: []
  /clients/stats:
    get:
      operationId: GET_clients-stats
      summary: Retrieve email statistics by client type.
      tags:
        - Stats
      description: |-
        **This endpoint allows you to retrieve your email statistics segmented by client type.**

        **We only store up to 7 days of email activity in our database.** By default, 500 items will be returned per request via the Advanced Stats API endpoints.

        Advanced Stats provide a more in-depth view of your email statistics and the actions taken by your recipients. You can segment these statistics by geographic location, device type, client type, browser, and mailbox provider. For more information about statistics, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/index.html).
      produces:
        - application/json
      parameters:
        - name: start_date
          in: query
          description: The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.
          required: true
          type: string
        - name: end_date
          in: query
          description: The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.
          required: false
          type: string
        - name: aggregated_by
          in: query
          description: 'How to group the statistics. Must be either "day", "week", or "month".'
          required: false
          type: string
          enum:
            - day
            - week
            - month
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/advanced_stats_opens'
          examples:
            application/json:
              - date: '2014-10-01'
                stats:
                  - metrics:
                      opens: 1
                      unique_opens: 1
                    name: Gmail
                    type: client
              - date: '2014-10-02'
                stats:
                  - metrics:
                      opens: 0
                      unique_opens: 0
                    name: Gmail
                    type: client
      security:
        - Authorization: []
  '/clients/{client_type}/stats':
    parameters:
      - name: client_type
        in: path
        description: 'Specifies the type of client to retrieve stats for. Must be either "phone", "tablet", "webmail", or "desktop".'
        required: true
        type: string
        enum:
          - phone
          - tablet
          - webmail
          - desktop
    get:
      operationId: GET_clients-client_type-stats
      summary: Retrieve stats by a specific client type.
      tags:
        - Stats
      description: |-
        **This endpoint allows you to retrieve your email statistics segmented by a specific client type.**

        **We only store up to 7 days of email activity in our database.** By default, 500 items will be returned per request via the Advanced Stats API endpoints.

        ## Available Client Types
        - phone
        - tablet
        - webmail
        - desktop

        Advanced Stats provide a more in-depth view of your email statistics and the actions taken by your recipients. You can segment these statistics by geographic location, device type, client type, browser, and mailbox provider. For more information about statistics, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/index.html).
      produces:
        - application/json
      parameters:
        - name: start_date
          in: query
          description: The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.
          required: true
          type: string
        - name: end_date
          in: query
          description: The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.
          required: false
          type: string
        - name: aggregated_by
          in: query
          description: 'How to group the statistics. Must be either "day", "week", or "month".'
          required: false
          type: string
          enum:
            - day
            - week
            - month
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/advanced_stats_opens'
          examples:
            application/json:
              - date: '2014-10-01'
                stats:
                  - metrics:
                      opens: 1
                      unique_opens: 1
                    name: Gmail
                    type: client
              - date: '2014-10-02'
                stats:
                  - metrics:
                      opens: 0
                      unique_opens: 0
                    name: Gmail
                    type: client
      security:
        - Authorization: []
  /mailbox_providers/stats:
    get:
      operationId: GET_mailbox_providers-stats
      summary: Retrieve email statistics by mailbox provider.
      tags:
        - Stats
      description: |-
        **This endpoint allows you to retrieve your email statistics segmented by recipient mailbox provider.**

        **We only store up to 7 days of email activity in our database.** By default, 500 items will be returned per request via the Advanced Stats API endpoints.

        Advanced Stats provide a more in-depth view of your email statistics and the actions taken by your recipients. You can segment these statistics by geographic location, device type, client type, browser, and mailbox provider. For more information about statistics, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/index.html).
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: The number of results to include on each page.
          required: false
          type: integer
        - name: offset
          in: query
          description: The number of results to exclude.
          required: false
          type: integer
        - name: aggregated_by
          in: query
          description: 'How to group the stats. Must be either "day", "wee", or "month".'
          required: false
          type: string
          enum:
            - day
            - week
            - month
        - name: start_date
          in: query
          description: The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.
          required: true
          type: string
        - name: end_date
          in: query
          description: The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.
          required: false
          type: string
        - name: mailbox_providers
          in: query
          description: The mail box providers to get statistics for. You can include up to 10 by including this parameter multiple times.
          required: false
          type: string
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/advanced_stats_mailbox_provider'
          examples:
            application/json:
              - date: '2015-10-11'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-12'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-13'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-14'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-15'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-16'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-17'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-18'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-19'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-20'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-21'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 1
                      drops: 0
                      opens: 1
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 1
              - date: '2015-10-22'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-23'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-24'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-25'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-26'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 2
                      drops: 0
                      opens: 2
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 2
              - date: '2015-10-27'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-28'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-29'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-30'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-10-31'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-01'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-02'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-03'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-04'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-05'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-06'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-07'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-08'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-09'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
              - date: '2015-11-10'
                stats:
                  - type: mailbox_provider
                    name: Gmail
                    metrics:
                      blocks: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      drops: 0
                      opens: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
      security:
        - Authorization: []
  /browsers/stats:
    get:
      operationId: GET_browsers-stats
      summary: Retrieve email statistics by browser.
      tags:
        - Stats
      description: |-
        **This endpoint allows you to retrieve your email statistics segmented by browser type.**

        **We only store up to 7 days of email activity in our database.** By default, 500 items will be returned per request via the Advanced Stats API endpoints.

        Advanced Stats provide a more in-depth view of your email statistics and the actions taken by your recipients. You can segment these statistics by geographic location, device type, client type, browser, and mailbox provider. For more information about statistics, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/index.html).
      produces:
        - application/json
      parameters:
        - name: start_date
          in: query
          description: The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.
          required: true
          type: string
        - name: end_date
          in: query
          description: The end date of the statistics to retrieve. Defaults to today.
          required: false
          type: string
        - name: limit
          in: query
          description: The number of results to include on each page.
          required: false
          type: string
        - name: offset
          in: query
          description: The number of results to exclude.
          required: false
          type: string
        - name: aggregated_by
          in: query
          description: 'How to group the stats. Must be either "day", "week", or "month".'
          required: false
          type: string
          enum:
            - day
            - week
            - month
        - name: browsers
          in: query
          description: The browsers to get statistics for. You can include up to 10 different browsers by including this parameter multiple times.
          required: false
          type: string
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/advanced_stats_clicks'
          examples:
            application/json:
              - date: '2014-10-01'
                stats:
                  - metrics:
                      clicks: 0
                      unique_clicks: 0
                    name: Chrome
                    type: browser
                  - metrics:
                      clicks: 1
                      unique_clicks: 1
                    name: Firefox
                    type: browser
              - date: '2014-10-02'
                stats:
                  - metrics:
                      clicks: 0
                      unique_clicks: 0
                    name: Chrome
                    type: browser
                  - metrics:
                      clicks: 1
                      unique_clicks: 1
                    name: Firefox
                    type: browser
      security:
        - Authorization: []
  /subusers:
    get:
      operationId: GET_subusers
      summary: List all Subusers
      tags:
        - Subusers API
      description: |-
        This endpoint allows you to retrieve a list of all of your subusers. You can choose to retrieve specific subusers as well as limit the results that come back from the API.

        For more information about Subusers:

        * [User Guide > Subusers](https://sendgrid.com/docs/User_Guide/Settings/Subusers/index.html)
        * [Classroom > How do I add more subusers to my account?](https://sendgrid.com/docs/Classroom/Basics/Account/how_do_i_add_more_subusers_to_my_account.html)
      produces:
        - application/json
      parameters:
        - name: username
          in: query
          description: The username of this subuser.
          type: string
        - name: limit
          in: query
          description: The number of results you would like to get in each request.
          type: integer
        - name: offset
          in: query
          description: The number of subusers to skip.
          type: integer
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/subuser'
          examples:
            application/json:
              - disabled: false
                email: example@example.com
                id: 1234
                username: example_subuser
              - disabled: false
                email: example2@example.com
                id: 1234
                username: example_subuser2
        '401':
          description: Unexpected error in API call. See HTTP response body for details.
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    post:
      operationId: POST_subusers
      summary: Create Subuser
      tags:
        - Subusers API
      description: |-
        This endpoint allows you to retrieve a list of all of your subusers. You can choose to retrieve specific subusers as well as limit the results that come back from the API.

        For more information about Subusers:

        * [User Guide > Subusers](https://sendgrid.com/docs/User_Guide/Settings/Subusers/index.html)
        * [Classroom > How do I add more subusers to my account?](https://sendgrid.com/docs/Classroom/Basics/Account/how_do_i_add_more_subusers_to_my_account.html)
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              username:
                type: string
                description: The username for this subuser.
              email:
                type: string
                description: The email address of the subuser.
                format: email
              password:
                type: string
                description: The password this subuser will use when logging into SendGrid.
              ips:
                type: array
                description: The IP addresses that should be assigned to this subuser.
                items:
                  type: string
                  format: ipv4
            required:
              - username
              - email
              - password
              - ips
            example:
              username: John@example.com
              email: John@example.com
              password: johns_password
              ips:
                - 1.1.1.1
                - 2.2.2.2
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/subuser_post'
          examples:
            application/json:
              username: example_subuser
              user_id: 1234
              email: example@example.com
              signup_session_token: ''
              authorization_token: ''
              credit_allocation:
                type: unlimited
        '400':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: username exists
                - message: unable to validate IPs at this time
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '403':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: you dont have permission to access this resource
        '500':
          description: ''
          schema:
            type: object
          examples:
            application/json:
              errors:
                - message: unable to validate IPs at this time
      security:
        - Authorization: []
  '/subusers/{subuser_name}':
    parameters:
      - name: subuser_name
        in: path
        required: true
        type: string
    patch:
      operationId: PATCH_subusers-subuser_name
      summary: Enable/disable a subuser
      tags:
        - Subusers API
      description: |-
        This endpoint allows you to enable or disable a subuser.

        For more information about Subusers:

        * [User Guide > Subusers](https://sendgrid.com/docs/User_Guide/Settings/Subusers/index.html)
        * [Classroom > How do I add more subusers to my account?](https://sendgrid.com/docs/Classroom/Basics/Account/how_do_i_add_more_subusers_to_my_account.html)
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              disabled:
                type: boolean
                description: 'Whether or not this subuser is disabled. True means disabled, False means enabled.'
            example:
              disabled: false
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
        '400':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: invalid username
                - message: no fields provided
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '500':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - message: unable to enable user
      security:
        - Authorization: []
    delete:
      operationId: DELETE_subusers-subuser_name
      summary: Delete a subuser
      tags:
        - Subusers API
      description: |-
        This endpoint allows you to delete a subuser. This is a permanent action, once deleted a subuser cannot be retrieved.

        For more information about Subusers:

        * [User Guide > Subusers](https://sendgrid.com/docs/User_Guide/Settings/Subusers/index.html)
        * [Classroom > How do I add more subusers to my account?](https://sendgrid.com/docs/Classroom/Basics/Account/how_do_i_add_more_subusers_to_my_account.html)
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  '/subusers/{subuser_name}/monitor':
    parameters:
      - name: subuser_name
        in: path
        description: The name of the subuser for which to retrieve monitor settings.
        required: true
        type: string
    get:
      operationId: GET_subusers-subuser_name-monitor
      summary: Retrieve monitor settings for a subuser
      tags:
        - Subusers API
      description: Subuser monitor settings allow you to receive a sample of an outgoing message by a specific customer at a specific frequency of emails.
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/monitor'
          examples:
            application/json:
              email: example@example.com
              frequency: 500
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: No monitor settings for this user
      security:
        - Authorization: []
    post:
      operationId: POST_subusers-subuser_name-monitor
      summary: Create monitor settings
      tags:
        - Subusers API
      description: Subuser monitor settings allow you to receive a sample of an outgoing message by a specific customer at a specific frequency of emails.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/monitor'
            example:
              email: example@example.com
              frequency: 50000
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/monitor'
          examples:
            application/json:
              email: example@example.com
              frequency: 50000
        '400':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: User already has a monitor
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    put:
      operationId: PUT_subusers-subuser_name-monitor
      summary: Update Monitor Settings for a subuser
      tags:
        - Subusers API
      description: Subuser monitor settings allow you to receive a sample of an outgoing message by a specific customer at a specific frequency of emails.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/monitor'
            example:
              email: example@example.com
              frequency: 500
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/monitor'
          examples:
            application/json:
              email: example@example.com
              frequency: 500
        '400':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: email
                  message: Email is required
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
    delete:
      operationId: DELETE_subusers-subuser_name-monitor
      summary: Delete monitor settings
      tags:
        - Subusers API
      description: Subuser monitor settings allow you to receive a sample of an outgoing message by a specific customer at a specific frequency of emails.
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:authorizationHeader:Authorization'
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties: {}
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
        '404':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: No monitor settings for this user
  /subusers/reputations:
    get:
      operationId: GET_subusers-reputations
      summary: Retrieve Subuser Reputations
      tags:
        - Subusers API
      description: |-
        Subuser sender reputations give a good idea how well a sender is doing with regards to how recipients and recipient servers react to the mail that is being received. When a bounce, spam report, or other negative action happens on a sent email, it will effect your sender rating.

        This endpoint allows you to request the reputations for your subusers.
      produces:
        - application/json
      parameters:
        - name: usernames
          in: query
          type: string
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                reputation:
                  type: number
                  description: The sender reputation this subuser has attained.
                username:
                  type: string
                  description: The subuser that has this reputation.f
              required:
                - reputation
                - username
          examples:
            application/json:
              - username: example_subuser
                reputation: 99
              - username: example_subuser2
                reputation: 95.2
      security:
        - Authorization: []
  '/subusers/{subuser_name}/ips':
    parameters:
      - name: subuser_name
        in: path
        required: true
        type: string
    put:
      operationId: PUT_subusers-subuser_name-ips
      summary: Update IPs assigned to a subuser
      tags:
        - Subusers API
      description: |-
        Each subuser should be assigned to an IP address, from which all of this subuser's mail will be sent. Often, this is the same IP as the parent account, but each subuser can have their own, or multiple, IP addresses as well.

        More information:

        * [How to request more IPs](https://sendgrid.com/docs/Classroom/Basics/Account/adding_an_additional_dedicated_ip_to_your_account.html)
        * [IPs can be whitelabeled](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/ips.html)
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: array
            description: The IP addresses you would like to assign to the subuser.
            items:
              type: string
              format: ipv4
            example:
              - 127.0.0.1
        - $ref: '#/parameters/trait:authorizationHeader:Authorization'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              ips:
                type: array
                description: The IP addresses that are assigned to the subuser.
                items:
                  type: string
                  format: ipv4
          examples:
            application/json:
              ips:
                - 127.0.0.1
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
  '/subusers/{subuser_name}/stats/monthly':
    parameters:
      - name: subuser_name
        in: path
        required: true
        type: string
    get:
      operationId: GET_subusers-subuser_name-stats-monthly
      summary: Retrieve the monthly email statistics for a single subuser
      tags:
        - Subusers API
      description: |-
        **This endpoint allows you to retrive the monthly email statistics for a specific subuser.**

        While you can always view the statistics for all email activity on your account, subuser statistics enable you to view specific segments of your stats for your subusers. Emails sent, bounces, and spam reports are always tracked for subusers. Unsubscribes, clicks, and opens are tracked if you have enabled the required settings.

        When using the \`sort_by_metric\` to sort your stats by a specific metric, you can not sort by the following metrics:
        \`bounce_drops\`, \`deferred\`, \`invalid_emails\`, \`processed\`, \`spam_report_drops\`, \`spam_reports\`, or \`unsubscribe_drops\`.

        For more information, see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/subuser.html).
      produces:
        - application/json
      parameters:
        - name: date
          in: query
          description: The date of the month to retrieve statistics for. Must be formatted YYYY-MM-DD
          required: true
          type: string
        - name: sort_by_metric
          in: query
          description: 'The metric that you want to sort by. Metrics that you can sort by are: \`blocks\`, \`bounces\`, \`clicks\`, \`delivered\`, \`opens\`, \`requests\`, \`unique_clicks\`, \`unique_opens\`, and \`unsubscribes\`.'''
          required: false
          type: string
          default: delivered
        - name: sort_by_direction
          in: query
          description: The direction you want to sort.
          required: false
          type: string
          default: desc
          enum:
            - desc
            - asc
        - name: limit
          in: query
          description: Optional field to limit the number of results returned.
          required: false
          type: integer
          default: 5
        - name: offset
          in: query
          description: Optional beginning point in the list to retrieve from.
          required: false
          type: integer
          default: 0
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/subuser_stats'
          examples:
            application/json:
              date: '2016-02-01'
              stats:
                - first_name: John
                  last_name: Doe
                  metrics:
                    blocks: 0
                    bounce_drops: 0
                    bounces: 0
                    clicks: 5
                    deferred: 0
                    delivered: 0
                    invalid_emails: 0
                    opens: 10
                    processed: 10
                    requests: 10
                    spam_report_drops: 0
                    spam_reports: 0
                    unique_clicks: 0
                    unique_opens: 0
                    unsubscribe_drops: 0
                    unsubscribes: 0
                  name: user1
                  type: subuser
      security:
        - Authorization: []
  /subusers/stats/monthly:
    get:
      operationId: GET_subusers-stats-monthly
      summary: Retrieve monthly stats for all subusers
      tags:
        - Subusers API
      description: |-
        **This endpoint allows you to retrieve the monthly email statistics for all subusers over the given date range.**

        While you can always view the statistics for all email activity on your account, subuser statistics enable you to view specific segments of your stats for your subusers. Emails sent, bounces, and spam reports are always tracked for subusers. Unsubscribes, clicks, and opens are tracked if you have enabled the required settings.

        When using the \`sort_by_metric\` to sort your stats by a specific metric, you can not sort by the following metrics:
        \`bounce_drops\`, \`deferred\`, \`invalid_emails\`, \`processed\`, \`spam_report_drops\`, \`spam_reports\`, or \`unsubscribe_drops\`.

        For more information, see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/subuser.html).
      produces:
        - application/json
      parameters:
        - name: date
          in: query
          description: The date of the month to retrieve statistics for. Must be formatted YYYY-MM-DD
          required: true
          type: string
        - name: subuser
          in: query
          description: A substring search of your subusers.
          required: false
          type: string
        - name: sort_by_metric
          in: query
          description: 'The metric that you want to sort by. Metrics that you can sort by are: \`blocks\`, \`bounces\`, \`clicks\`, \`delivered\`, \`opens\`, \`requests\`, \`unique_clicks\`, \`unique_opens\`, and \`unsubscribes\`.'''
          required: false
          type: string
          default: delivered
        - name: sort_by_direction
          in: query
          description: The direction you want to sort.
          required: false
          type: string
          default: desc
          enum:
            - desc
            - asc
        - name: limit
          in: query
          description: Optional field to limit the number of results returned.
          required: false
          type: integer
          default: 5
        - name: offset
          in: query
          description: Optional beginning point in the list to retrieve from.
          required: false
          type: integer
          default: 0
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/subuser_stats'
          examples:
            application/json:
              date: '2016-02-01'
              stats:
                - first_name: John
                  last_name: Doe
                  metrics:
                    blocks: 0
                    bounce_drops: 0
                    bounces: 0
                    clicks: 0
                    deferred: 0
                    delivered: 0
                    invalid_emails: 0
                    opens: 1
                    processed: 0
                    requests: 100
                    spam_report_drops: 0
                    spam_reports: 99
                    unique_clicks: 0
                    unique_opens: 0
                    unsubscribe_drops: 0
                    unsubscribes: 0
                  name: user1
                  type: subuser
                - first_name: Jane
                  last_name: Doe
                  metrics:
                    blocks: 0
                    bounce_drops: 0
                    bounces: 0
                    clicks: 5
                    deferred: 0
                    delivered: 0
                    invalid_emails: 0
                    opens: 10
                    processed: 10
                    requests: 10
                    spam_report_drops: 0
                    spam_reports: 0
                    unique_clicks: 0
                    unique_opens: 0
                    unsubscribe_drops: 0
                    unsubscribes: 0
                  name: user2
                  type: subuser
      security:
        - Authorization: []
  /subusers/stats/sums:
    get:
      operationId: GET_subusers-stats-sums
      summary: ' Retrieve the totals for each email statistic metric for all subusers.'
      tags:
        - Subusers API
      description: |-
        **This endpoint allows you to retrieve the total sums of each email statistic metric for all subusers over the given date range.**


        While you can always view the statistics for all email activity on your account, subuser statistics enable you to view specific segments of your stats. Emails sent, bounces, and spam reports are always tracked for subusers. Unsubscribes, clicks, and opens are tracked if you have enabled the required settings.

        For more information, see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/subuser.html).
      produces:
        - application/json
      parameters:
        - name: sort_by_direction
          in: query
          description: 'The direction you want to sort. '
          required: false
          type: string
          default: desc
          enum:
            - desc
            - asc
        - name: start_date
          in: query
          description: The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.
          required: true
          type: string
        - name: end_date
          in: query
          description: The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.
          required: false
          type: string
        - name: limit
          in: query
          description: Limits the number of results returned per page.
          required: false
          type: integer
          default: 5
        - name: offset
          in: query
          description: The point in the list to begin retrieving results from.
          required: false
          type: integer
          default: 0
        - name: aggregated_by
          in: query
          description: How to group the statistics. Defaults to today. Must follow format YYYY-MM-DD.
          required: false
          type: string
        - name: sort_by_metric
          in: query
          description: The metric that you want to sort by.  Must be a single metric.
          required: false
          type: string
          default: delivered
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/category_stats'
          examples:
            application/json:
              date: '2015-10-11'
              stats: []
      security:
        - Authorization: []
  /subusers/stats:
    get:
      operationId: GET_subusers-stats
      summary: Retrieve email statistics for your subusers.
      tags:
        - Subusers API
      description: |-
        **This endpoint allows you to retrieve the email statistics for the given subusers.**

        You may retrieve statistics for up to 10 different subusers by including an additional _subusers_ parameter for each additional subuser.

        While you can always view the statistics for all email activity on your account, subuser statistics enable you to view specific segments of your stats. Emails sent, bounces, and spam reports are always tracked for subusers. Unsubscribes, clicks, and opens are tracked if you have enabled the required settings.

        For more information, see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/subuser.html).
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: Limits the number of results returned per page.
          required: false
          type: integer
        - name: offset
          in: query
          description: The point in the list to begin retrieving results from.
          required: false
          type: integer
        - name: aggregated_by
          in: query
          description: 'How to group the statistics. Must be either "day", "week", or "month".'
          required: false
          type: string
          enum:
            - day
            - week
            - month
        - name: subusers
          in: query
          description: The subuser you want to retrieve statistics for. You may include this parameter up to 10 times to retrieve statistics for multiple subusers.
          required: true
          type: string
        - name: start_date
          in: query
          description: The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.
          required: true
          type: string
        - name: end_date
          in: query
          description: The end date of the statistics to retrieve. Defaults to today.
          required: false
          type: string
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/stats'
          examples:
            application/json:
              - date: '2015-10-01'
                stats:
                  - type: subuser
                    name: Matt_subuser
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-10-02'
                stats:
                  - type: subuser
                    name: Matt_subuser
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-10-03'
                stats:
                  - type: subuser
                    name: Matt_subuser
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-10-04'
                stats:
                  - type: subuser
                    name: Matt_subuser
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-10-05'
                stats:
                  - type: subuser
                    name: Matt_subuser
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-10-06'
                stats:
                  - type: subuser
                    name: Matt_subuser
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-10-07'
                stats:
                  - type: subuser
                    name: Matt_subuser
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-10-08'
                stats:
                  - type: subuser
                    name: Matt_subuser
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-10-09'
                stats:
                  - type: subuser
                    name: Matt_subuser
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
              - date: '2015-10-10'
                stats:
                  - type: subuser
                    name: Matt_subuser
                    metrics:
                      blocks: 0
                      bounce_drops: 0
                      bounces: 0
                      clicks: 0
                      deferred: 0
                      delivered: 0
                      invalid_emails: 0
                      opens: 0
                      processed: 0
                      requests: 0
                      spam_report_drops: 0
                      spam_reports: 0
                      unique_clicks: 0
                      unique_opens: 0
                      unsubscribe_drops: 0
                      unsubscribes: 0
      security:
        - Authorization: []
  /suppression/unsubscribes:
    get:
      operationId: GET_suppression-unsubscribes
      summary: Retrieve all global suppressions
      tags:
        - Suppressions - Global Suppressions
      description: |-
        **This endpoint allows you to retrieve a list of all email address that are globally suppressed.**

        A global suppression (or global unsubscribe) is an email address of a recipient who does not want to receive any of your messages. A globally suppressed recipient will be removed from any email you send. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/global_unsubscribes.html).
      produces:
        - application/json
      parameters:
        - name: start_time
          in: query
          description: Refers start of the time range in unix timestamp when an unsubscribe email was created (inclusive).
          type: integer
        - name: end_time
          in: query
          description: Refers end of the time range in unix timestamp when an unsubscribe email was created (inclusive).
          type: integer
        - name: limit
          in: query
          description: The number of results to display on each page.
          type: integer
        - name: offset
          in: query
          description: The point in the list of results to begin displaying global suppressions.
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                created:
                  type: integer
                  description: A Unix timestamp indicating when the recipient was added to the global suppression list.
                email:
                  type: string
                  description: The email address of the recipient who is globally suppressed.
              required:
                - created
                - email
          examples:
            application/json:
              - created: 1443651141
                email: user1@example.com
              - created: 1443651154
                email: user2@example.com
      security:
        - Authorization: []
  /asm/suppressions/global:
    post:
      operationId: POST_asm-suppressions-global
      summary: Add recipient addresses to the global suppression group.
      tags:
        - Suppressions - Global Suppressions
      description: |-
        **This endpoint allows you to add one or more email addresses to the global suppressions group.**

        A global suppression (or global unsubscribe) is an email address of a recipient who does not want to receive any of your messages. A globally suppressed recipient will be removed from any email you send. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/global_unsubscribes.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              recipient_emails:
                type: array
                description: 'The email address, or addresses, that you want to add to the global suppressions group.'
                items:
                  type: string
            example:
              recipient_emails:
                - test1@example.com
                - test2@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            type: object
            properties:
              recipient_emails:
                type: array
                description: The email addresses that are globally suppressed
                items:
                  type: string
            required:
              - recipient_emails
          examples:
            application/json:
              recipient_emails:
                - test1@example.com
                - test2@example.com
      security:
        - Authorization: []
  '/asm/suppressions/global/{email}':
    parameters:
      - name: email
        in: path
        description: 'The email address of the global suppression you want to retrieve. Or, if you want to check if an email address is on the global suppressions list, enter that email address here.'
        required: true
        type: string
    get:
      operationId: GET_asm-suppressions-global-email
      summary: Retrieve a Global Suppression
      tags:
        - Suppressions - Global Suppressions
      description: |-
        **This endpoint allows you to retrieve a global suppression. You can also use this endpoint to confirm if an email address is already globally suppresed.**

        If the email address you include in the URL path parameter \`{email}\` is alreayd globally suppressed, the response will include that email address. If the address you enter for \`{email}\` is not globally suppressed, an empty JSON object \`{}\` will be returned.

        A global suppression (or global unsubscribe) is an email address of a recipient who does not want to receive any of your messages. A globally suppressed recipient will be removed from any email you send. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/global_unsubscribes.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            title: Retrieve a Global Suppression response
            type: object
            properties:
              recipient_email:
                type: string
                description: The email address that is globally suppressed. This will be an empty object if the email address you included in your call is not globally suppressed.
            required:
              - recipient_email
      security:
        - Authorization: []
    delete:
      operationId: DELETE_asm-suppressions-global-email
      summary: Delete a Global Suppression
      tags:
        - Suppressions - Global Suppressions
      description: |-
        **This endpoint allows you to remove an email address from the global suppressions group.**

        A global suppression (or global unsubscribe) is an email address of a recipient who does not want to receive any of your messages. A globally suppressed recipient will be removed from any email you send. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/global_unsubscribes.html).
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
      security:
        - Authorization: []
  '/asm/groups/{group_id}/suppressions':
    parameters:
      - name: group_id
        in: path
        description: The id of the unsubscribe group that you are adding suppressions to.
        required: true
        type: string
    post:
      operationId: POST_asm-groups-group_id-suppressions
      summary: Add suppressions to a suppression group
      tags:
        - Suppressions - Suppressions
      description: |-
        **This endpoint allows you to add email addresses to an unsubscribe group.**

        If you attempt to add suppressions to a group that has been deleted or does not exist, the suppressions will be added to the global suppressions list.

        Suppressions are recipient email addresses that are added to [unsubscribe groups](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html). Once a recipient's address is on the suppressions list for an unsubscribe group, they will not receive any emails that are tagged with that unsubscribe group.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              recipient_emails:
                type: array
                description: The email address that you want to add to the unsubscribe group.
                items:
                  type: string
            required:
              - recipient_emails
            example:
              recipient_emails:
                - test1@example.com
                - test2@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            type: object
            properties:
              recipient_emails:
                type: array
                description: The email address that were added to the suppressions list.
                items:
                  type: string
            required:
              - recipient_emails
          examples:
            application/json:
              recipient_emails:
                - test1@example.com
                - test2@example.com
      security:
        - Authorization: []
    get:
      operationId: GET_asm-groups-group_id-suppressions
      summary: Retrieve all suppressions for a suppression group
      tags:
        - Suppressions - Suppressions
      description: |-
        **This endpoint allows you to retrieve all suppressed email addresses belonging to the given group.**

        Suppressions are recipient email addresses that are added to [unsubscribe groups](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html). Once a recipient's address is on the suppressions list for an unsubscribe group, they will not receive any emails that are tagged with that unsubscribe group.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            description: The list of email addresses belonging to the given suppression group.
            items:
              type: string
          examples:
            application/json:
              - example@example.com
              - example2@example.com
      security:
        - Authorization: []
  '/asm/groups/{group_id}/suppressions/{email}':
    parameters:
      - name: group_id
        in: path
        description: The id of the suppression group that you are removing an email address from.
        required: true
        type: string
      - name: email
        in: path
        description: The email address that you want to remove from the suppression group.
        required: true
        type: string
    delete:
      operationId: DELETE_asm-groups-group_id-suppressions-email
      summary: Delete a suppression from a suppression group
      tags:
        - Suppressions - Suppressions
      description: |-
        **This endpoint allows you to remove a suppressed email address from the given suppression group.**

        Suppressions are recipient email addresses that are added to [unsubscribe groups](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html). Once a recipient's address is on the suppressions list for an unsubscribe group, they will not receive any emails that are tagged with that unsubscribe group.
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: 'null'
      security:
        - Authorization: []
  /asm/suppressions:
    get:
      operationId: GET_asm-suppressions
      summary: Retrieve all suppressions
      tags:
        - Suppressions - Suppressions
      description: |-
        **This endpoint allows you to retrieve a list of all suppressions.**

        Suppressions are a list of email addresses that will not receive content sent under a given [group](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                email:
                  type: string
                  description: The email address that was suppressed.
                group_id:
                  type: integer
                  description: The id of the suppression group that this email address belongs to.
                group_name:
                  type: string
                  description: The name of the suppression group that this email address belongs to.
                created_at:
                  type: integer
                  description: A UNIX timestamp indicating when the suppression was created.
              required:
                - email
                - group_id
                - group_name
                - created_at
          examples:
            application/json:
              - email: test1@example.com
                group_id: 1
                group_name: Weekly News
                created_at: 1410986704
              - email: test1@example.com
                group_id: 2
                group_name: Daily News
                created_at: 1411493671
              - email: test2@example.com
                group_id: 2
                group_name: Daily News
                created_at: 1411493671
      security:
        - Authorization: []
  '/asm/suppressions/{email}':
    parameters:
      - name: email
        in: path
        description: The email address that you want to search suppression groups for.
        required: true
        type: string
    get:
      operationId: GET_asm-suppressions-email
      summary: Retrieve all suppression groups for an email address
      tags:
        - Suppressions - Suppressions
      description: |-
        **This endpoint returns the list of all groups that the given email address has been unsubscribed from.**

        Suppressions are a list of email addresses that will not receive content sent under a given [group](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              suppressions:
                type: array
                description: The array of suppression groups.
                items:
                  type: object
                  properties:
                    description:
                      type: string
                      description: The description of the suppression group.
                    id:
                      type: integer
                      description: The id of the suppression group.
                    is_default:
                      type: boolean
                      description: Indicates if the suppression group  is set as the default.
                    name:
                      type: string
                      description: The name of the suppression group.
                    suppressed:
                      type: boolean
                      description: Indicates if the given email address is suppressed for this group.
                  required:
                    - description
                    - id
                    - is_default
                    - name
                    - suppressed
            required:
              - suppressions
          examples:
            application/json:
              suppressions:
                - description: Optional description.
                  id: 1
                  is_default: true
                  name: Weekly News
                  suppressed: true
                - description: Some daily news.
                  id: 2
                  is_default: true
                  name: Daily News
                  suppressed: true
                - description: An old group.
                  id: 2
                  is_default: false
                  name: Old News
                  suppressed: false
      security:
        - Authorization: []
  '/asm/groups/{group_id}/suppressions/search':
    parameters:
      - name: group_id
        in: path
        description: The ID of the suppression group that you would like to search.
        required: true
        type: string
    post:
      operationId: POST_asm-groups-group_id-suppressions-search
      summary: Search for suppressions within a group
      tags:
        - Suppressions - Suppressions
      description: |-
        **This endpoint allows you to search a suppression group for multiple suppressions.**

        When given a list of email addresses and a group ID, this endpoint will return only the email addresses that have been unsubscribed from the given group.

        Suppressions are a list of email addresses that will not receive content sent under a given [group](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              recipient_emails:
                type: array
                description: The list of email address that you want to search the suppression group for.
                items:
                  type: string
            required:
              - recipient_emails
            example:
              recipient_emails:
                - exists1@example.com
                - exists2@example.com
                - doesnotexists@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              recipient_emails:
                type: array
                description: The email address from your search that do exist in the suppression group.
                items:
                  type: string
            required:
              - recipient_emails
          examples:
            application/json:
              recipient_emails:
                - exists1@example.com
                - exists2@example.com
      security:
        - Authorization: []
  /asm/groups:
    get:
      operationId: GET_asm-groups
      summary: Retrieve information about multiple suppression groups
      tags:
        - Suppressions - Unsubscribe Groups
      description: |-
        **This endpoint allows you to retrieve information about multiple suppression groups.**

        This endpoint will return information for each group ID that you include in your request. To add a group ID to your request, simply append \`&id=\` followed by the group ID.

        Suppressions are a list of email addresses that will not receive content sent under a given [group](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html).

        Suppression groups, or [unsubscribe groups](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html), allow you to label a category of content that you regularly send. This gives your recipients the ability to opt out of a specific set of your email. For example, you might define a group for your transactional email, and one for your marketing email so that your users can continue recieving your transactional email witout having to receive your marketing content.
      produces:
        - application/json
      parameters:
        - name: id
          in: query
          description: The ID of a suppression group that you want to retrieve information for.
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/suppression_group'
          examples:
            application/json:
              - id: 100
                name: Newsletters
                description: Our monthly newsletter.
                last_email_sent_at: null
                is_default: true
                unsubscribes: 400
              - id: 101
                name: Alerts
                description: Emails triggered by user-defined rules.
                last_email_sent_at: null
                is_default: false
                unsubscribes: 1
      security:
        - Authorization: []
    post:
      operationId: POST_asm-groups
      summary: Create a new suppression group
      tags:
        - Suppressions - Unsubscribe Groups
      description: |-
        **This endpoint allows you to create a new suppression group.**

        Suppression groups, or unsubscribe groups, are specific types or categories of email that you would like your recipients to be able to unsubscribe from. For example: Daily Newsletters, Invoices, System Alerts.

        The **name** and **description** of the unsubscribe group will be visible by recipients when they are managing their subscriptions.

        Each user can create up to 25 different suppression groups.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              name:
                type: string
                description: The name that you would like to use for your new suppression group.
                maxLength: 30
              description:
                type: string
                description: A brief description of your new suppression group.
                maxLength: 100
              is_default:
                type: boolean
                description: Indicates if you would like this to be your default suppression group.
            required:
              - name
              - description
            example:
              name: Product Suggestions
              description: Suggestions for products our users might like.
              is_default: true
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            type: object
            properties:
              id:
                type: integer
                description: The ID of the suppression group.
              name:
                type: string
                description: The name of the suppression group.
              description:
                type: string
                description: A brief description of the suppression group.
              is_default:
                type: boolean
                description: Indicates if this is the default suppression group.
            required:
              - id
              - name
              - description
              - is_default
          examples:
            application/json:
              id: 103
              name: Product Suggestions
              description: Suggestions for products our users might like.
              is_default: false
      security:
        - Authorization: []
  '/asm/groups/{group_id}':
    parameters:
      - name: group_id
        in: path
        description: The ID of the suppression group you would like to retrieve.
        required: true
        type: string
    get:
      operationId: GET_asm-groups-group_id
      summary: Get information on a single suppression group.
      tags:
        - Suppressions - Unsubscribe Groups
      description: |-
        **This endpoint allows you to retrieve a single suppression group.**

        Suppression groups, or unsubscribe groups, are specific types or categories of email that you would like your recipients to be able to unsubscribe from. For example: Daily Newsletters, Invoices, System Alerts.

        The **name** and **description** of the unsubscribe group will be visible by recipients when they are managing their subscriptions.

        Each user can create up to 25 different suppression groups.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              description:
                type: string
                description: The description of the suppression group.
              id:
                type: integer
                description: The ID of the suppression group.
              is_default:
                type: boolean
                description: Indicates if this is the default suppression group.
              last_email_sent_at:
                type: 'null'
                description: A unix timestamp indicating the last time this group was assigned to an email.
              name:
                type: string
                description: The name of the suppression group.
              unsubscribes:
                type: integer
                description: 'The number of unsubscribes, or suppressions, in this group.'
          examples:
            application/json:
              description: Our monthly newsletter.
              id: 100
              is_default: true
              last_email_sent_at: null
              name: Newsletters
              unsubscribes: 400
      security:
        - Authorization: []
    patch:
      operationId: PATCH_asm-groups-group_id
      summary: Update a suppression group.
      tags:
        - Suppressions - Unsubscribe Groups
      description: |-
        **This endpoint allows you to update or change a suppression group.**

        Suppression groups, or unsubscribe groups, are specific types or categories of email that you would like your recipients to be able to unsubscribe from. For example: Daily Newsletters, Invoices, System Alerts.

        The **name** and **description** of the unsubscribe group will be visible by recipients when they are managing their subscriptions.

        Each user can create up to 25 different suppression groups.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              id:
                type: integer
                description: The id of the suppression group.
              name:
                type: string
                description: The name of the suppression group. Each group created by a user must have a unique name.
                maxLength: 30
              description:
                type: string
                description: The description of the suppression group.
                maxLength: 100
              is_default:
                type: boolean
                description: Indicates if the suppression group is set as the default group.
            required:
              - name
            example:
              id: 103
              name: Item Suggestions
              description: Suggestions for items our users might like.
        - $ref: '#/parameters/trait:authorizationHeader:Authorization'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/suppression_group'
          examples:
            application/json:
              id: 103
              name: Item Suggestions
              description: Suggestions for items our users might like.
    delete:
      operationId: DELETE_asm-groups-group_id
      summary: Delete a suppression group.
      tags:
        - Suppressions - Unsubscribe Groups
      description: |-
        **This endpoint allows you to delete a suppression group.**

        You can only delete groups that have not been attached to sent mail in the last 60 days. If a recipient uses the "one-click unsubscribe" option on an email associated with a deleted group, that recipient will be added to the global suppression list.

        Suppression groups, or unsubscribe groups, are specific types or categories of email that you would like your recipients to be able to unsubscribe from. For example: Daily Newsletters, Invoices, System Alerts.

        The **name** and **description** of the unsubscribe group will be visible by recipients when they are managing their subscriptions.

        Each user can create up to 25 different suppression groups.
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
      security:
        - Authorization: []
  /scopes/requests:
    get:
      operationId: GET_v3-scopes-requests
      summary: Retrieve access requests
      tags:
        - Teammates
      description: |-
        This endpoint allows you to retrieve a list of all recent access requests.

        **Note:** The Response Header's 'link' parameter will include pagination info. For example:

      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: Optional field to limit the number of results returned.
          type: integer
          default: 50
        - name: offset
          in: query
          description: Optional beginning point in the list to retrieve from.
          type: integer
          default: 0
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                id:
                  type: integer
                  description: Request ID
                scope_group_name:
                  type: string
                  description: Name of group of scopes associated to page teammate is requesting access to
                username:
                  type: string
                  description: Teammate's username
                email:
                  type: string
                  description: Teammate's email
                first_name:
                  type: string
                  description: Teammate's first name
                last_name:
                  type: string
                  description: Teammate's last name
          examples:
            application/json:
              - id: 1
                scope_group_name: Mail Settings
                username: teammate1
                email: teammate1@example.com
                first_name: Teammate
                last_name: One
              - id: 2
                scope_group_name: Stats
                username: teammate2
                email: teammate2@example.com
                first_name: Teammate
                last_name: Two
      security:
        - Authorization: []
  '/scopes/requests/{request_id}':
    parameters:
      - name: request_id
        in: path
        description: The ID of the request that you want to deny.
        required: true
        type: string
    delete:
      operationId: DELETE_v3-scopes-requests-request_id
      summary: Deny access request
      tags:
        - Teammates
      description: |-
        This endpoint allows you to deny an attempt to access your account.

        **Note:** Only teammate admins may delete a teammate's access request.
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        '204':
          description: ''
        '401':
          description: ''
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: Cannot find request
                  field: request_id
      security:
        - Authorization: []
  '/scopes/requests/{request_id}/approve':
    parameters:
      - name: request_id
        in: path
        description: The ID of the request that you want to approve.
        required: true
        type: string
    patch:
      operationId: PATCH_v3-scopes-requests-approve-id
      summary: Approve access request
      tags:
        - Teammates
      description: |-
        This endpoint allows you to approve an access attempt.

        **Note:** Only teammate admins may approve another teammate’s access request.
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              scope_group_name:
                type: string
                description: name of feature teammate will be given access to
          examples:
            application/json:
              scope_group_name: Stats
        '401':
          description: ''
          schema:
            type: object
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
      security:
        - Authorization: []
  '/teammates/pending/{token}/resend':
    parameters:
      - name: token
        in: path
        description: The token for the invite that you want to resend.
        required: true
        type: string
    post:
      operationId: POST_v3-teammates-pending-token-resend
      summary: Resend teammate invite
      tags:
        - Teammates
      description: |-
        This endpoint allows you to resend a teammate invite.

        **Note:** Teammate invitations will expire after 7 days. Resending an invite will reset the expiration date.
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              token:
                type: string
                description: ID to identify invite
              email:
                type: string
                description: Teammate's email address
              scopes:
                type: array
                description: Initial set of permissions to give to teammate if they accept the invite
                items:
                  type: string
              is_admin:
                type: boolean
                description: Set to true if teammate should have admin privileges
          examples:
            application/json:
              pending_id: abc123abc
              email: teammate1@example.com
              scopes:
                - user.profile.read
                - user.profile.update
              is_admin: false
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: invalid pending key
                  field: pending_key
      security:
        - Authorization: []
  /teammates/pending:
    get:
      operationId: GET_v3-teammates-pending
      summary: Retrieve all pending teammates
      tags:
        - Teammates
      description: |-
        This endpoint allows you to retrieve a list of all pending teammate invitations.

        **Note:** Each teammate invitation is valid for 7 days. Users may resend the invite to refresh the expiration date.
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                items:
                  type: object
                  properties:
                    email:
                      type: string
                      description: Email address teammate invite will be sent to
                    scopes:
                      type: array
                      description: List of permissions to give teammate if they accept
                      items:
                        type: string
                    is_admin:
                      type: boolean
                      description: Set to true to indicate teammate should have the same set of permissions as parent user
                    token:
                      type: string
                      description: Invitation token used to identify user
                    expiration_date:
                      type: integer
                      description: timestamp indicates when invite will expire. Expiration is 7 days after invite creation
          examples:
            application/json:
              result:
                - email: user1@example.com
                  scopes:
                    - user.profile.read
                    - user.profile.edit
                  is_admin: false
                  pending_id: abcd123abc
                  expiration_date: 1456424263
                - email: user2@example.com
                  scopes: []
                  is_admin: true
                  pending_id: bcde234bcd
                  expiration_date: 1456424263
      security:
        - Authorization: []
  '/teammates/pending/{token}':
    parameters:
      - name: token
        in: path
        description: The token for the invite you want to delete.
        required: true
        type: string
    delete:
      operationId: DELETE_v3-teammates-pending-token
      summary: Delete pending teammate
      tags:
        - Teammates
      description: This endpoint allows you to delete a pending teammate invite.
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        '204':
          description: ''
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
      security:
        - Authorization: []
  /teammates:
    post:
      operationId: POST_v3-teammates
      summary: Invite teammate
      tags:
        - Teammates
      description: |-
        This endpoint allows you to send a teammate invitation via email with a predefined set of scopes, or permissions.

        **Note:** A teammate invite will expire after 7 days, but you may resend the invite at any time to reset the expiration date.

        Essentials, [Legacy Lite](https://sendgrid.com/docs/Classroom/Basics/Billing/legacy_lite_plan.html), and Free Trial users may create up to one teammate per account. There are no limits for how many teammates a Pro or higher account may create.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              email:
                type: string
                description: New teammate's email
                minLength: 5
                maxLength: 255
                pattern: ^.*@.*\..*
              scopes:
                type: array
                description: Set to specify list of scopes that teammate should have. Should be empty if teammate is an admin.
                items:
                  type: string
              is_admin:
                type: boolean
                default: false
                description: Set to true if teammate should be an admin user
            required:
              - email
              - scopes
              - is_admin
            example:
              email: teammate1@example.com
              scopes:
                - user.profile.read
                - user.profile.update
              is_admin: false
      responses:
        '201':
          description: ''
          schema:
            type: object
            properties:
              token:
                type: string
                description: Token to identify invite
              email:
                type: string
                description: Teammate's email address
              scopes:
                type: array
                description: Initial set of permissions to give to teammate if they accept the invite
                items: {}
              is_admin:
                type: boolean
                description: Set to true if teammate should have admin privileges
          examples:
            application/json:
              email: teammate1@example.com
              scopes:
                - user.profile.read
                - user.profile.update
              is_admin: false
        '400':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
      security:
        - Authorization: []
    get:
      operationId: GET_v3-teammates
      summary: Retrieve all teammates
      tags:
        - Teammates
      description: |-
        This endpoint allows you to retrieve a list of all current teammates.

        **Note:** The Response Header will include pagination info. For example:
      parameters:
        - name: limit
          in: query
          description: Number of items to return
          type: integer
          default: 500
          minimum: 0
          maximum: 500
        - name: offset
          in: query
          description: Paging offset
          type: integer
          default: 0
          minimum: 0
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              result:
                type: array
                items:
                  type: object
                  properties:
                    username:
                      type: string
                      description: Teammate's username
                    email:
                      type: string
                      description: Teammate's email
                    first_name:
                      type: string
                      description: Teammate's first name
                    last_name:
                      type: string
                      description: Teammate's last name
                    user_type:
                      type: string
                      description: 'Indicate the type of user: owner user, teammate admin user, or normal teammate'
                      enum:
                        - admin
                        - owner
                        - teammate
                    is_admin:
                      type: boolean
                      description: Set to true if teammate has admin privileges
                    phone:
                      type: string
                      description: (optional) Teammate's phone number
                    website:
                      type: string
                      description: (optional) Teammate's website
                    address:
                      type: string
                      description: (optional) Teammate's address
                    address2:
                      type: string
                      description: (optional) Teammate's address
                    city:
                      type: string
                      description: (optional) Teammate's city
                    state:
                      type: string
                      description: (optional) Teammate's state
                    zip:
                      type: string
                      description: (optional) Teammate's zip
                    country:
                      type: string
                      description: (optional) Teammate's country
      security:
        - Authorization: []
  '/teammates/{username}':
    parameters:
      - name: username
        in: path
        description: The username of the teammate that you want to retrieve.
        required: true
        type: string
    get:
      operationId: GET_v3-teammates-username
      summary: Retrieve specific teammate
      tags:
        - Teammates
      description: This endpoint allows you to retrieve a specific teammate by username.
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              username:
                type: string
                description: Teammate's username
              first_name:
                type: string
                description: Teammate's first name
              last_name:
                type: string
                description: Teammate's last name
              email:
                type: string
                description: Teammate's email
              scopes:
                type: array
                description: Scopes associated to teammate
                items: {}
              user_type:
                type: string
                description: 'Indicate the type of user: account owner, teammate admin user, or normal teammate'
                enum:
                  - admin
                  - owner
                  - teammate
              is_admin:
                type: boolean
                description: Set to true if teammate has admin privileges
              phone:
                type: string
                description: (optional) Teammate's phone number
              website:
                type: string
                description: (optional) Teammate's website
              address:
                type: string
                description: (optional) Teammate's address
              address2:
                type: string
                description: (optional) Teammate's address
              city:
                type: string
                description: (optional) Teammate's city
              state:
                type: string
                description: (optional) Teammate's state
              zip:
                type: string
                description: (optional) Teammate's zip
              country:
                type: string
                description: (optional) Teammate's country
          examples:
            application/json:
              username: teammate1
              first_name: Jane
              last_name: Doe
              email: teammate1@example.com
              scopes:
                - user.profile.read
                - user.profile.update
                - ...
              user_type: admin
              is_admin: true
              phone: 123-345-3453
              website: www.example.com
              company: ACME Inc.
              address: 123 Acme St
              address2: ''
              city: City
              state: CA
              country: USA
              zip: '12345'
      security:
        - Authorization: []
    patch:
      operationId: PATCH_v3-teammates-username
      summary: Update teammate's permissions
      tags:
        - Teammates
      description: |-
        This endpoint allows you to update a teammate’s permissions.

        To turn a teammate into an admin, the request body should contain an \`is_admin\` set to \`true\`. Otherwise, set \`is_admin\` to \`false\` and pass in all the scopes that a teammate should have.

        **Only the parent user or other admin teammates can update another teammate’s permissions.**

        **Admin users can only update permissions.**
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              scopes:
                type: array
                description: 'Provide list of scopes that should be given to teammate. If specifying list of scopes, is_admin should be set to False.'
                items:
                  type: string
              is_admin:
                type: boolean
                description: 'Set to True if this teammate should be promoted to an admin user. If True, scopes should be an empty array.'
            required:
              - scopes
              - is_admin
            example:
              scopes:
                - user.profile.read
                - user.profile.edit
              is_admin: false
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              username:
                type: string
                description: Teammate's username
              first_name:
                type: string
                description: Teammate's first name
              last_name:
                type: string
                description: Teammate's last name
              email:
                type: string
                description: Teammate's email address
              scopes:
                type: array
                description: Scopes given to teammate
                items:
                  type: string
              user_type:
                type: string
                description: 'Indicate the type of user: owner user, teammate admin user, or normal teammate'
                enum:
                  - admin
                  - owner
                  - teammate
              is_admin:
                type: boolean
                description: Set to true if teammate has admin priveleges
              phone:
                type: string
                description: (optional) Teammate's phone number
              website:
                type: string
                description: (optional) Teammate's website
              address:
                type: string
                description: (optional) Teammate's address
              address2:
                type: string
                description: (optional) Teammate's address
              city:
                type: string
                description: (optional) Teammate's city
              state:
                type: string
                description: (optional) Teammate's state
              zip:
                type: string
                description: (optional) Teammate's zip
              country:
                type: string
                description: (optional) Teammate's country
          examples:
            application/json:
              username: teammate1
              first_name: Jane
              last_name: Doe
              email: teammate1@example.com
              scopes:
                - user.profile.read
                - user.profile.edit
              user_type: teammate
              is_admin: false
              phone: 123-345-3453
              website: www.example.com
              company: ACME Inc.
              address: 123 Acme St
              address2: ''
              city: City
              state: CA
              country: USA
              zip: '12345'
        '400':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: one or more of given scopes are invalid
                  field: scopes
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: username not found
                  field: username
      security:
        - Authorization: []
    delete:
      operationId: DELETE_v3-teammates-username
      summary: Delete teammate
      tags:
        - Teammates
      description: |-
        This endpoint allows you to delete a teammate.

        **Only the parent user or an admin teammate can delete another teammate.**
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        '204':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                    field:
                      type: string
          examples:
            application/json:
              errors:
                - message: username not found
                  field: username
      security:
        - Authorization: []
  /templates:
    post:
      operationId: POST_templates
      summary: Create a transactional template.
      tags:
        - Transactional Templates
      description: |-
        **This endpoint allows you to create a transactional template.**

        Each user can create up to 300 different transactional templates. Transactional templates are specific to accounts and subusers. Templates created on a parent account will not be accessible from the subuser accounts.

        Transactional templates are templates created specifically for transactional email and are not to be confused with [Marketing Campaigns templates](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/templates.html). For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              name:
                type: string
                description: The name for the new transactional template.
                maxLength: 100
            required:
              - name
            example:
              name: example_name
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/transactional_template'
          examples:
            application/json:
              id: 733ba07f-ead1-41fc-933a-3976baa23716
              name: example_name
              versions: []
      security:
        - Authorization: []
    get:
      operationId: GET_templates
      summary: Retrieve all transactional templates.
      tags:
        - Transactional Templates
      description: |-
        **This endpoint allows you to retrieve all transactional templates.**

        Each user can create up to 300 different transactional templates. Transactional templates are specific to accounts and subusers. Templates created on a parent account will not be accessible from the subuser accounts.

        Transactional templates are templates created specifically for transactional email and are not to be confused with [Marketing Campaigns templates](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/templates.html). For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/transactional_template'
      security:
        - Authorization: []
  '/templates/{template_id}':
    parameters:
      - name: template_id
        in: path
        description: The id of the transactional template you want to retrieve.
        required: true
        type: string
    get:
      operationId: GET_templates-template_id
      summary: Retrieve a single transactional template.
      tags:
        - Transactional Templates
      description: |-
        **This endpoint allows you to retrieve a single transactional template.**

        Each user can create up to 300 different transactional templates. Transactional templates are specific to accounts and subusers. Templates created on a parent account will not be accessible from the subuser accounts.

        Transactional templates are templates created specifically for transactional email and are not to be confused with [Marketing Campaigns templates](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/templates.html). For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/transactional_template'
      security:
        - Authorization: []
    patch:
      operationId: PATCH_templates-template_id
      summary: Edit a transactional template.
      tags:
        - Transactional Templates
      description: |-
        **This endpoint allows you to edit a transactional template.**

        Each user can create up to 300 different transactional templates. Transactional templates are specific to accounts and subusers. Templates created on a parent account will not be accessible from the subuser accounts.

        Transactional templates are templates created specifically for transactional email and are not to be confused with [Marketing Campaigns templates](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/templates.html). For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              name:
                type: string
                description: The name of the transactional template.
                maxLength: 100
            example:
              name: new_example_name
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/transactional_template'
          examples:
            application/json:
              id: 733ba07f-ead1-41fc-933a-3976baa23716
              name: new_example_name
              versions: []
      security:
        - Authorization: []
    delete:
      operationId: DELETE_templates-template_id
      summary: Delete a template.
      tags:
        - Transactional Templates
      description: |-
        **This endpoint allows you to delete a transactional template.**

        Each user can create up to 300 different transactional templates. Transactional templates are specific to accounts and subusers. Templates created on a parent account will not be accessible from the subuser accounts.

        Transactional templates are templates created specifically for transactional email and are not to be confused with [Marketing Campaigns templates](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/templates.html). For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
      security:
        - Authorization: []
  '/templates/{template_id}/versions':
    parameters:
      - name: template_id
        in: path
        required: true
        type: string
    post:
      operationId: POST_templates-template_id-versions
      summary: Create a new transactional template version.
      tags:
        - Transactional Templates Versions
      description: |-
        **This endpoint allows you to create a new version of a template.**

        Each transactional template can have multiple versions, each version with its own subject and content. Each user can have up to 300 versions across across all templates.

        For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/transactional_template_version'
            example:
              template_id: ddb96bbc-9b92-425e-8979-99464621b543
              active: 1
              name: example_version_name
              html_content: <%body%>
              plain_content: <%body%>
              subject: <%subject%>
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            type: object
            properties:
              id:
                type: string
                description: The id of the new transactional template version.
              updated_at:
                type: string
                description: The date and time that this transactional template version was updated.
              Transactional Template Version:
                $ref: '#/definitions/transactional_template_version'
            required:
              - id
              - updated_at
          examples:
            application/json:
              id: 8aefe0ee-f12b-4575-b5b7-c97e21cb36f3
              template_id: ddb96bbc-9b92-425e-8979-99464621b543
              active: 1
              name: example_version_name
              html_content: <%body%>
              plain_content: <%body%>
              subject: <%subject%>
              updated_at: '2014-03-19 18:56:33'
      security:
        - Authorization: []
  '/templates/{template_id}/versions/{version_id}/activate':
    parameters:
      - name: template_id
        in: path
        required: true
        type: string
      - name: version_id
        in: path
        required: true
        type: string
    post:
      operationId: POST_templates-template_id-versions-version_id-activate
      summary: Activate a transactional template version.
      tags:
        - Transactional Templates Versions
      description: |-
        **This endpoint allows you to activate a version of one of your templates.**

        Each transactional template can have multiple versions, each version with its own subject and content. Each user can have up to 300 versions across across all templates.


        For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

        ## URI Parameters
        | URI Parameter | Type | Description |
        |---|---|---|
        | template_id | string | The ID of the original template |
        | version_id | string |  The ID of the template version |
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              id:
                type: string
                description: The ID of the template version.
              updated_at:
                type: string
                description: The date and time that the version was last updated.
              Transactional Template Version:
                $ref: '#/definitions/transactional_template_version'
            required:
              - id
              - updated_at
          examples:
            application/json:
              id: 8aefe0ee-f12b-4575-b5b7-c97e21cb36f3
              template_id: e3a61852-1acb-4b32-a1bc-b44b3814ab78
              active: 1
              name: example_version_name
              html_content: <%body%>
              plain_content: <%body%>
              subject: <%subject%>
              updated_at: '2014-06-12 11:33:00'
      security:
        - Authorization: []
  '/templates/{template_id}/versions/{version_id}':
    parameters:
      - name: template_id
        in: path
        required: true
        type: string
      - name: version_id
        in: path
        required: true
        type: string
    get:
      operationId: GET_templates-template_id-versions-version_id
      summary: Retrieve a specific transactional template version.
      tags:
        - Transactional Templates Versions
      description: |-
        **This endpoint allows you to retrieve a specific version of a template.**

        Each transactional template can have multiple versions, each version with its own subject and content. Each user can have up to 300 versions across across all templates.

        For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

        ## URI Parameters
        | URI Parameter | Type | Description |
        |---|---|---|
        | template_id | string | The ID of the original template |
        | version_id | string |  The ID of the template version |
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              id:
                type: string
                description: The ID of the template version.
              updated_at:
                type: string
                description: The date and time that the template version was last updated.
              Transactional Template Version:
                $ref: '#/definitions/transactional_template_version'
            required:
              - id
              - updated_at
          examples:
            application/json:
              id: 5997fcf6-2b9f-484d-acd5-7e9a99f0dc1f
              template_id: d51480ca-ca3f-465c-bc3e-ceb71d73c38d
              active: 1
              name: version 1 name
              html_content: <%body%>
              plain_content: <%body%>
              subject: <%subject%>
              updated_at: '2014-03-19 18:56:33'
      security:
        - Authorization: []
    patch:
      operationId: PATCH_templates-template_id-versions-version_id
      summary: Edit a transactional template version.
      tags:
        - Transactional Templates Versions
      description: |-
        **This endpoint allows you to edit a version of one of your transactional templates.**

        Each transactional template can have multiple versions, each version with its own subject and content. Each user can have up to 300 versions across across all templates.

        For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

        ## URI Parameters
        | URI Parameter | Type | Description |
        |---|---|---|
        | template_id | string | The ID of the original template |
        | version_id | string | The ID of the template version |
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              active:
                type: integer
                description: Indicates if the template version is active.
              name:
                type: string
                description: The name of the template version.
              html_content:
                type: string
                description: The HTML content of the template version.
              plain_content:
                type: string
                description: The text/plain content of the template version.
              subject:
                type: string
                description: The subject of the template version.
            example:
              active: 1
              name: updated_example_name
              html_content: <%body%>
              plain_content: <%body%>
              subject: <%subject%>
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              id:
                type: string
                description: The ID of the template version.
              updated_at:
                type: string
                description: The date and time that the template version was last updated.
              Transactional Template Version:
                $ref: '#/definitions/transactional_template_version'
            required:
              - id
              - updated_at
          examples:
            application/json:
              id: 5997fcf6-2b9f-484d-acd5-7e9a99f0dc1f
              template_id: d51480ca-ca3f-465c-bc3e-ceb71d73c38d
              active: 1
              name: version 1 name
              html_content: <%body%>
              plain_content: <%body%>
              subject: <%subject%>
              updated_at: '2014-03-19 18:56:33'
      security:
        - Authorization: []
    delete:
      operationId: DELETE_templates-template_id-versions-version_id
      summary: Delete a transactional template version.
      tags:
        - Transactional Templates Versions
      description: |-
        **This endpoint allows you to delete one of your transactional template versions.**

        Each transactional template can have multiple versions, each version with its own subject and content. Each user can have up to 300 versions across across all templates.

        For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

        ## URI Parameters
        | URI Parameter | Type | Description |
        |---|---|---|
        | template_id | string | The ID of the original template |
        | version_id | string | The ID of the template version |
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: 'null'
      security:
        - Authorization: []
  /user/profile:
    get:
      operationId: GET_user-profile
      summary: Get a user's profile
      tags:
        - Users API
      description: |-
        Keeping your user profile up to date is important. This will help SendGrid to verify who you are as well as contact you should we need to.

        For more information about your user profile:

        * [SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            title: GET User Profile response
            type: object
            properties:
              address:
                type: string
                description: The user's address.
              address2:
                type: string
                description: The second line of the user's address.
              city:
                type: string
                description: The user's city.
              company:
                type: string
                description: The name of the user's company.
              country:
                type: string
                description: The user's country.
              first_name:
                type: string
                description: The user's first name.
              last_name:
                type: string
                description: The user's last name.
              phone:
                type: string
                description: The user's phone number.
              state:
                type: string
                description: The user's state.
              website:
                type: string
                description: The user's website URL.
              zip:
                type: string
                description: The user's zip code.
            required:
              - address
              - city
              - company
              - country
              - first_name
              - last_name
              - phone
              - state
              - website
              - zip
          examples:
            application/json:
              address: 814 West Chapman Avenue
              address2: ''
              city: Orange
              company: SendGrid
              country: US
              first_name: Test
              last_name: User
              phone: 555-555-5555
              state: CA
              website: 'http://www.sendgrid.com'
              zip: '92868'
      security:
        - Authorization: []
    patch:
      operationId: PATCH_user-profile
      summary: Update a user's profile
      tags:
        - Users API
      description: |-
        **This endpoint allows you to update your current profile details.**

        Keeping your user profile up to date is important. This will help SendGrid to verify who you are as well as contact you should we need to.

        For more information about your user profile:

        * [SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)

        It should be noted that any one or more of the parameters can be updated via the PATCH /user/profile endpoint. The only requirement is that you include at least one when you PATCH.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/user_profile'
            example:
              first_name: Example
              last_name: User
              city: Orange
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/user_profile'
          examples:
            application/json:
              address: 814 West Chapman Avenue
              address2: ''
              city: Orange
              company: SendGrid
              country: US
              first_name: Example
              last_name: User
              phone: 555-555-5555
              state: CA
              website: 'http://www.sendgrid.com'
              zip: '92868'
        '401':
          description: ''
          schema:
            $ref: '#/definitions/global:ErrorResponse'
          examples:
            application/json:
              errors:
                - field: null
                  message: authorization required
      security:
        - Authorization: []
  /user/account:
    get:
      operationId: GET_user-account
      summary: Get a user's account information.
      tags:
        - Users API
      description: |-
        **This endpoint allows you to retrieve your user account details.**

        Your user's account information includes the user's account type and reputation.

        Keeping your user profile up to date is important. This will help SendGrid to verify who you are as well as contact you should we need to.

        For more information about your user profile:

        * [SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            title: GET User Account response
            type: object
            properties:
              type:
                type: string
                description: The type of account for this user.
                enum:
                  - free
                  - paid
              reputation:
                type: number
                description: The sender reputation for this user.
            required:
              - type
              - reputation
          examples:
            application/json:
              reputation: 100
              type: paid
      security:
        - Authorization: []
  /user/email:
    get:
      operationId: GET_user-email
      summary: Retrieve your account email address
      tags:
        - Users API
      description: |-
        **This endpoint allows you to retrieve the email address currently on file for your account.**

        Keeping your user profile up to date is important. This will help SendGrid to verify who you are as well as contact you should we need to.

        For more information about your user profile:

        * [SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              email:
                type: string
                description: The email address currently on file for your account.
            required:
              - email
          examples:
            application/json:
              email: test@example.com
      security:
        - Authorization: []
    put:
      operationId: PUT_user-email
      summary: Update your account email address
      tags:
        - Users API
      description: |-
        **This endpoint allows you to update the email address currently on file for your account.**

        Keeping your user profile up to date is important. This will help SendGrid to verify who you are as well as contact you should we need to.

        For more information about your user profile:

        * [SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              email:
                type: string
                description: The new email address that you would like to use for your account.
            example:
              email: example@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              email:
                type: string
                description: The current email address on file for your account.
            required:
              - email
      security:
        - Authorization: []
  /user/username:
    get:
      operationId: GET_user-username
      summary: Retrieve your username
      tags:
        - Users API
      description: |-
        **This endpoint allows you to retrieve your current account username.**

        Keeping your user profile up to date is important. This will help SendGrid to verify who you are as well as contact you should we need to.

        For more information about your user profile:

        * [SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              username:
                type: string
                description: Your account username.
              user_id:
                type: integer
                description: The user ID for your account.
            required:
              - username
              - user_id
          examples:
            application/json:
              username: test_username
              user_id: 1
      security:
        - Authorization: []
    put:
      operationId: PUT_user-username
      summary: Update your username
      tags:
        - Users API
      description: |-
        **This endpoint allows you to update the username for your account.**

        Keeping your user profile up to date is important. This will help SendGrid to verify who you are as well as contact you should we need to.

        For more information about your user profile:

        * [SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              username:
                type: string
                description: The new username you would like to use for your account.
            example:
              username: test_username
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              username:
                type: string
                description: The current username on file for your account.
            required:
              - username
          examples:
            application/json:
              username: test_username
      security:
        - Authorization: []
  /user/credits:
    get:
      operationId: GET_user-credits
      summary: Retrieve your credit balance
      tags:
        - Users API
      description: |-
        **This endpoint allows you to retrieve the current credit balance for your account.**

        Your monthly credit allotment limits the number of emails you may send before incurring overage charges. For more information about credits and billing, please visit our [Clssroom](https://sendgrid.com/docs/Classroom/Basics/Billing/billing_info_and_faqs.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              remain:
                type: integer
                description: The remaining number of credits available on your account.
              total:
                type: integer
                description: The total number of credits assigned to your account.
              overage:
                type: integer
                description: The number of overdrawn credits for your account.
              used:
                type: integer
                description: The number of credits that you have used.
              last_reset:
                type: string
                description: The date that your credit balance was last reset.
              next_reset:
                type: string
                description: The next date that your credit balance will be reset.
              reset_frequency:
                type: string
                description: The frequency at which your credit balance will be reset.
            required:
              - remain
              - total
              - overage
              - used
              - last_reset
              - next_reset
              - reset_frequency
          examples:
            application/json:
              remain: 200
              total: 200
              overage: 0
              used: 0
              last_reset: '2013-01-01'
              next_reset: '2013-02-01'
              reset_frequency: monthly
      security:
        - Authorization: []
  /user/password:
    put:
      operationId: PUT_user-password
      summary: Update your password
      tags:
        - Users API
      description: |-
        **This endpoint allows you to update your password.**

        Keeping your user profile up to date is important. This will help SendGrid to verify who you are as well as contact you should we need to.

        For more information about your user profile:

        * [SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              new_password:
                type: string
                description: The new password you would like to use for your account.
              old_password:
                type: string
                description: The old password for your account.
            required:
              - new_password
              - old_password
            example:
              new_password: new_password
              old_password: old_password
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties: {}
      security:
        - Authorization: []
  /user/webhooks/event/settings:
    get:
      operationId: GET_user-webhooks-event-settings
      summary: Retrieve Event Webhook settings
      tags:
        - Webhooks
      description: |-
        **This endpoint allows you to retrieve your current event webhook settings.**

        If an event type is marked as \`true\`, then the event webhook will include information about that event.

        SendGrid’s Event Webhook will notify a URL of your choice via HTTP POST with information about events that occur as SendGrid processes your email.

        Common uses of this data are to remove unsubscribes, react to spam reports, determine unengaged recipients, identify bounced email addresses, or create advanced analytics of your email program.
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/event_webhook_settings'
          examples:
            application/json:
              enabled: true
              url: url
              group_resubscribe: true
              delivered: true
              group_unsubscribe: true
              spam_report: true
              bounce: true
              deferred: true
              unsubscribe: true
              processed: true
              open: true
              click: true
              dropped: true
      security:
        - Authorization: []
    patch:
      operationId: PATCH_user-webhooks-event-settings
      summary: Update Event Notification Settings
      tags:
        - Webhooks
      description: |-
        **This endpoint allows you to update your current event webhook settings.**

        If an event type is marked as \`true\`, then the event webhook will include information about that event.

        SendGrid’s Event Webhook will notify a URL of your choice via HTTP POST with information about events that occur as SendGrid processes your email.

        Common uses of this data are to remove unsubscribes, react to spam reports, determine unengaged recipients, identify bounced email addresses, or create advanced analytics of your email program.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            $ref: '#/definitions/event_webhook_settings'
            example:
              enabled: true
              url: url
              group_resubscribe: true
              delivered: true
              group_unsubscribe: true
              spam_report: true
              bounce: true
              deferred: true
              unsubscribe: true
              processed: true
              open: true
              click: true
              dropped: true
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/event_webhook_settings'
          examples:
            application/json:
              enabled: true
              url: url
              group_resubscribe: true
              delivered: true
              group_unsubscribe: true
              spam_report: true
              bounce: true
              deferred: true
              unsubscribe: true
              processed: true
              open: true
              click: true
              dropped: true
      security:
        - Authorization: []
  /user/webhooks/event/test:
    post:
      operationId: POST_user-webhooks-event-test
      summary: Test Event Notification Settings
      tags:
        - Webhooks
      description: |-
        **This endpoint allows you to test your event webhook by sending a fake event notification post to the provided URL.**

        SendGrid’s Event Webhook will notify a URL of your choice via HTTP POST with information about events that occur as SendGrid processes your email.

        Common uses of this data are to remove unsubscribes, react to spam reports, determine unengaged recipients, identify bounced email addresses, or create advanced analytics of your email program.
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              url:
                type: string
                description: The URL where you would like the test notification to be sent.
            example:
              url: url
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
      security:
        - Authorization: []
  /user/webhooks/parse/stats:
    get:
      operationId: GET_user-webhooks-parse-stats
      summary: Retrieves Inbound Parse Webhook statistics.
      tags:
        - Webhooks
      description: |-
        **This endpoint allows you to retrieve the statistics for your Parse Webhook useage.**

        SendGrid's Inbound Parse Webhook allows you to parse the contents and attachments of incomming emails. The Parse API can then POST the parsed emails to a URL that you specify. The Inbound Parse Webhook cannot parse messages greater than 20MB in size, including all attachments.

        There are a number of pre-made integrations for the SendGrid Parse Webhook which make processing events easy. You can find these integrations in the [Library Index](https://sendgrid.com/docs/Integrate/libraries.html#-Webhook-Libraries).
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: The number of statistics to return on each page.
          required: false
          type: string
        - name: offset
          in: query
          description: The number of statistics to skip.
          required: false
          type: string
        - name: aggregated_by
          in: query
          description: 'How you would like the statistics to by grouped. '
          required: false
          type: string
          enum:
            - day
            - week
            - month
        - name: start_date
          in: query
          description: The starting date of the statistics you want to retrieve. Must be in the format YYYY-MM-DD
          required: true
          type: string
        - name: end_date
          in: query
          description: The end date of the statistics you want to retrieve. Must be in the format YYYY-MM-DD
          required: false
          type: string
          default: The day the request is made.
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                date:
                  type: string
                  description: The date that the stats were collected.
                stats:
                  type: array
                  description: The Parse Webhook usage statistics.
                  items:
                    type: object
                    properties:
                      metrics:
                        type: object
                        properties:
                          received:
                            type: number
                            description: The number of emails received and parsed by the Parse Webhook.
                        required:
                          - received
              required:
                - date
                - stats
          examples:
            application/json:
              - date: '2015-10-11'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-12'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-13'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-14'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-15'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-16'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-17'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-18'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-19'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-20'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-21'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-22'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-23'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-24'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-25'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-26'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-27'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-28'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-29'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-30'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-10-31'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-11-01'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-11-02'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-11-03'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-11-04'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-11-05'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-11-06'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-11-07'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-11-08'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-11-09'
                stats:
                  - metrics:
                      received: 0
              - date: '2015-11-10'
                stats:
                  - metrics:
                      received: 0
      security:
        - Authorization: []
  /whitelabel/domains:
    get:
      operationId: GET_whitelabel-domains
      summary: List all domain whitelabels.
      tags:
        - Whitelabel - Domains
      description: |-
        **This endpoint allows you to retrieve a list of all domain whitelabels you have created.**

        A domain whitelabel allows you to remove the “via” or “sent on behalf of” message that your recipients see when they read your emails. Whitelabeling a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

        For more information on whitelabeling, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/index.html)
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: Number of domains to return.
          type: integer
        - name: offset
          in: query
          description: Paging offset.
          type: integer
        - name: exclude_subusers
          in: query
          description: Exclude subuser domains from the result.
          type: boolean
        - name: username
          in: query
          description: The username associated with a whitelabel.
          type: string
        - name: domain
          in: query
          description: Search for domain whitelabels that match the given domain.
          type: string
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              type: object
              properties:
                id:
                  type: number
                  description: The ID of the domain whitelabel.
                user_id:
                  type: number
                  description: The ID of the user that this whitelabel will be associated with.
                subdomain:
                  type: string
                  description: The subdomain created for this domain whitelabel.
                domain:
                  type: string
                  description: The domain that this whitelabel was created for.
                username:
                  type: string
                  description: The username that this whitelabel is associated with.
                ips:
                  type: array
                  description: The IPs that will be included in the custom SPF record.
                  items:
                    type: string
                custom_spf:
                  type: boolean
                  description: Indicates if this whitelabel has custom SPF.
                default:
                  type: boolean
                  description: Indicates if this whitelabel has been set as the default whitelabel.
                legacy:
                  type: boolean
                  description: Indicates if this is whitelabel was created with the legacy whitelabel tool.
                automatic_security:
                  type: boolean
                  description: Indicates if this whitelabel uses automated security.
                valid:
                  type: boolean
                  description: Indicates if this is a valid whitelabel or not.
                dns:
                  type: object
                  description: The DNS records for this whitelabel that are used for authenticating the sending domain.
                  properties:
                    mail_server:
                      type: object
                      description: Designates which mail server is responsible for accepting messages from a domain.
                      properties:
                        valid:
                          type: boolean
                          description: Indicates if this is a valid DNS record with no conflicts.
                        type:
                          type: string
                          description: The type of DNS record.
                        host:
                          type: string
                          description: The domain sending the messages.
                        data:
                          type: string
                          description: The mail server responsible for accepting messages.
                    subdomain_spf:
                      type: object
                      description: The SPF record for the subdomain used to create this whitelabel.
                      properties:
                        valid:
                          type: boolean
                          description: Indicates if the SPF record is valid.
                        type:
                          type: string
                          description: The type of data in the SPF record.
                        host:
                          type: string
                          description: The domain that this SPF record will be used to authenticate.
                        data:
                          type: string
                          description: The SPF record.
                    dkim:
                      type: object
                      description: The DNS record used when creating the DKIM signature.
                      properties:
                        valid:
                          type: boolean
                          description: Indicates if this DNS record is valid.
                        type:
                          type: string
                          description: The type of DNS record.
                          enum:
                            - cname
                            - mx
                            - txt
                        host:
                          type: string
                          description: The domain that these DNS records will be applied to.
                          format: hostname
                        data:
                          type: string
                          description: The DNS record.
              required:
                - id
                - user_id
                - subdomain
                - domain
                - username
                - ips
                - custom_spf
                - default
                - legacy
                - automatic_security
                - valid
                - dns
          examples:
            application/json:
              - id: 1
                domain: example.com
                subdomain: mail
                username: john@example.com
                user_id: 7
                ips:
                  - 192.168.1.1
                  - 192.168.1.2
                custom_spf: true
                default: true
                legacy: false
                automatic_security: true
                valid: true
                dns:
                  mail_cname:
                    host: mail.example.com
                    type: cname
                    data: u7.wl.sendgrid.net
                    valid: true
                  spf:
                    host: example.com
                    type: txt
                    data: 'v=spf1 include:u7.wl.sendgrid.net -all'
                    valid: true
                  dkim1:
                    host: s1._domainkey.example.com
                    type: cname
                    data: s1._domainkey.u7.wl.sendgrid.net
                    valid: true
                  dkim2:
                    host: s2._domainkey.example.com
                    type: cname
                    data: s2._domainkey.u7.wl.sendgrid.net
                    valid: true
              - id: 2
                domain: example2.com
                subdomain: news
                username: jane@example2.com
                user_id: 8
                ips: []
                custom_spf: false
                default: true
                legacy: false
                automatic_security: true
                valid: false
                dns:
                  mail_server:
                    host: news.example2.com
                    type: mx
                    data: sendgrid.net
                    valid: false
                  subdomain_spf:
                    host: news.example2.com
                    type: txt
                    data: 'v=spf1 include:sendgrid.net ~all'
                    valid: false
                  domain_spf:
                    host: example2.com
                    type: txt
                    data: 'v=spf1 include:news.example2.com -all'
                    valid: false
                  dkim:
                    host: example2.com
                    type: txt
                    data: k=rsa; t=s; p=publicKey
                    valid: false
      security:
        - Authorization: []
    post:
      operationId: POST_whitelabel-domains
      summary: Create a domain whitelabel.
      tags:
        - Whitelabel - Domains
      description: |-
        **This endpoint allows you to create a whitelabel for one of your domains.**

        If you are creating a domain whitelabel that you would like a subuser to use, you have two options:
        1. Use the "username" parameter. This allows you to create a whitelabel on behalf of your subuser. This means the subuser is able to see and modify the created whitelabel.
        2. Use the Association workflow (see Associate Domain section). This allows you to assign a whitelabel created by the parent to a subuser. This means the subuser will default to the assigned whitelabel, but will not be able to see or modify that whitelabel. However, if the subuser creates their own whitelabel it will overwrite the assigned whitelabel.

        A domain whitelabel allows you to remove the “via” or “sent on behalf of” message that your recipients see when they read your emails. Whitelabeling a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

        For more information on whitelabeling, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/index.html)
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              domain:
                type: string
                description: Domain being whitelabeled.
              subdomain:
                type: string
                description: The subdomain to use for this domain whitelabel.
              username:
                type: string
                description: The username that this whitelabel will be associated with.
              ips:
                type: array
                description: The IP addresses that will be included in the custom SPF record for this whitelabel.
                items:
                  type: string
              custom_spf:
                type: boolean
                description: Specify whether to use a custom SPF or allow SendGrid to manage your SPF. This option is only available to domain whitelabels setup for manual security.
              default:
                type: boolean
                description: Whether to use this whitelabel as the fallback if no domain whitelabels match the sender's domain.
              automatic_security:
                type: boolean
                description: 'Whether to allow SendGrid to manage your SPF records, DKIM keys, and DKIM key rotation.'
            required:
              - domain
              - subdomain
            example:
              domain: example.com
              subdomain: news
              username: john@example.com
              ips:
                - 192.168.1.1
                - 192.168.1.2
              custom_spf: true
              default: true
              automatic_security: false
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/whitelabel::domain'
          examples:
            application/json:
              id: 302183
              user_id: 1446226
              subdomain: example
              domain: example.com
              username: mbernier
              ips: []
              custom_spf: false
              default: true
              legacy: false
              automatic_security: true
              valid: false
              dns:
                mail_cname:
                  valid: false
                  type: cname
                  host: example.example.com
                  data: u1446226.wl.sendgrid.net
                dkim1:
                  valid: false
                  type: cname
                  host: s1._domainkey.example.com
                  data: s1.domainkey.u1446226.wl.sendgrid.net
                dkim2:
                  valid: false
                  type: cname
                  host: s2._domainkey.example.com
                  data: s2.domainkey.u1446226.wl.sendgrid.net
      security:
        - Authorization: []
  '/whitelabel/domains/{domain_id}':
    parameters:
      - name: domain_id
        in: path
        required: true
        type: string
    get:
      operationId: GET_whitelabel-domains-domain_id
      summary: Retrieve a domain whitelabel.
      tags:
        - Whitelabel - Domains
      description: |-
        **This endpoint allows you to retrieve a specific domain whitelabel.**

        A domain whitelabel allows you to remove the “via” or “sent on behalf of” message that your recipients see when they read your emails. Whitelabeling a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

        For more information on whitelabeling, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/index.html)
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/whitelabel::domain'
      security:
        - Authorization: []
    patch:
      operationId: PATCH_whitelabel-domains-domain_id
      summary: Update a domain whitelabel.
      tags:
        - Whitelabel - Domains
      description: |-
        **This endpoint allows you to update the settings for a domain whitelabel.**

        A domain whitelabel allows you to remove the “via” or “sent on behalf of” message that your recipients see when they read your emails. Whitelabeling a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

        For more information on whitelabeling, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/index.html)
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              default:
                type: boolean
                default: false
                description: Indicates whether this domain whitelabel should be considered the default.
              custom_spf:
                type: boolean
                default: false
                description: Indicates whether to generate a custom SPF record for manual security.
            example:
              default: false
              custom_spf: true
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            title: Update a Domain response
            type: object
            properties:
              default false:
                description: Inidcates whether this domain whitelabel should be considered the default.  Defaults to false.
                type: boolean
              custom_spf false:
                description: Indicates whether to generate a custom SPF record for manual security.  Defaults to false.
                type: boolean
      security:
        - Authorization: []
    delete:
      operationId: DELETE_whitelabel-domains-domain_id
      summary: Delete a domain whitelabel.
      tags:
        - Whitelabel - Domains
      description: |-
        **This endpoint allows you to delete a domain whitelabel.**

        A domain whitelabel allows you to remove the “via” or “sent on behalf of” message that your recipients see when they read your emails. Whitelabeling a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

        For more information on whitelabeling, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/index.html)
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
      security:
        - Authorization: []
  /whitelabel/domains/default:
    get:
      operationId: GET_whitelabel-domains-default
      summary: Get the default domain whitelabel.
      tags:
        - Whitelabel - Domains
      description: |-
        **This endpoint allows you to retrieve the default whitelabel for a domain.**

        A domain whitelabel allows you to remove the “via” or “sent on behalf of” message that your recipients see when they read your emails. Whitelabeling a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

        For more information on whitelabeling, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/index.html)

        ## URI Parameters
        | URI Parameter   | Type   | Description  |
        |---|---|---|
        | domain | string  |The domain to find a default domain whitelabel for. |
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/whitelabel:domain_spf'
      security:
        - Authorization: []
  '/whitelabel/domains/{id}/ips':
    parameters:
      - name: id
        in: path
        required: true
        type: string
    post:
      operationId: POST_whitelabel-domains-id-ips
      summary: Add an IP to a domain whitelabel.
      tags:
        - Whitelabel - Domains
      description: |-
        **This endpoint allows you to add an IP address to a domain whitelabel.**

        A domain whitelabel allows you to remove the “via” or “sent on behalf of” message that your recipients see when they read your emails. Whitelabeling a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

        For more information on whitelabeling, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/index.html)

        ## URI Parameters
        | URI Parameter   | Type  |  Description  |
        |---|---|---|
        | id | integer  | ID of the domain to which you are adding an IP |
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              ip:
                type: string
                description: IP to associate with the domain. Used for manually specifying IPs for custom SPF.
            required:
              - ip
            example:
              ip: 192.168.0.1
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/whitelabel:domain_spf'
          examples:
            application/json:
              id: 1
              domain: example.com
              subdomain: mail
              username: john@example.com
              user_id: 7
              ips: []
              custom_spf: true
              default: false
              legacy: false
              automatic_security: false
              valid: false
              dns:
                mail_server:
                  host: mail.example.com
                  type: mx
                  data: sendgrid.net
                  valid: false
                subdomain_spf:
                  host: mail.example.com
                  type: txt
                  data: 'v=spf1 ip4:192.168.1.1 ip4:192.168.0.1 -all'
                  valid: false
                domain_spf:
                  host: example.com
                  type: txt
                  data: 'v=spf1 include:mail.example.com -all'
                  valid: false
                dkim:
                  host: s1._domainkey.example.com
                  type: txt
                  data: k=rsa; t=s; p=publicKey
                  valid: false
      security:
        - Authorization: []
  '/whitelabel/domains/{id}/ips/{ip}':
    parameters:
      - name: id
        in: path
        required: true
        type: string
      - name: ip
        in: path
        required: true
        type: string
    delete:
      operationId: DELETE_whitelabel-domains-id-ips-ip
      summary: Remove an IP from a domain whitelabel.
      tags:
        - Whitelabel - Domains
      description: |-
        **This endpoint allows you to remove a domain's IP address from that domain's whitelabel.**

        A domain whitelabel allows you to remove the “via” or “sent on behalf of” message that your recipients see when they read your emails. Whitelabeling a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

        For more information on whitelabeling, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/index.html)

        ## URI Parameters
        | URI Parameter   | Type  | Description  |
        |---|---|---|
        | id | integer  | ID of the domain whitelabel to delete the IP from. |
        | ip | string | IP to remove from the domain whitelabel. |
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/whitelabel:domain_spf'
          examples:
            application/json:
              id: 1
              domain: example.com
              subdomain: mail
              username: mail@example.com
              user_id: 7
              ips: []
              custom_spf: true
              default: false
              legacy: false
              automatic_security: false
              valid: false
              dns:
                mail_server:
                  host: mail.example.com
                  type: mx
                  data: sendgrid.net
                  valid: false
                subdomain_spf:
                  host: mail.example.com
                  type: txt
                  data: 'v=spf1 ip4:192.168.1.1 ip4:192.168.0.1 -all'
                  valid: false
                domain_spf:
                  host: example.com
                  type: txt
                  data: 'v=spf1 include:mail.example.com -all'
                  valid: false
                dkim:
                  host: s1._domainkey.example.com
                  type: txt
                  data: k=rsa; t=s; p=publicKey
                  valid: false
      security:
        - Authorization: []
  '/whitelabel/domains/{id}/validate':
    parameters:
      - name: id
        in: path
        required: true
        type: string
    post:
      operationId: POST_whitelabel-domains-id-validate
      summary: Validate a domain whitelabel.
      tags:
        - Whitelabel - Domains
      description: |-
        **This endpoint allows you to validate a domain whitelabel. If it fails, it will return an error message describing why the whitelabel could not be validated.**

        A domain whitelabel allows you to remove the “via” or “sent on behalf of” message that your recipients see when they read your emails. Whitelabeling a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

        For more information on whitelabeling, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/index.html)

        ## URI Parameters
        | URI Parameter   | Type   | Description  |
        |---|---|---|
        | id | integer  |ID of the domain whitelabel to validate. |
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              id:
                type: integer
                description: The ID of the domain whitelabel.
              valid:
                type: boolean
                description: Indicates if this is a valid whitelabel.
              validation_resuts:
                type: object
                description: 'The individual DNS records that are checked when validating, including the reason for any invalid DNS records.'
                properties:
                  mail_cname:
                    type: object
                    description: The CNAME record for the domain whitelabel.
                    properties:
                      valid:
                        type: boolean
                        description: Indicates if this DNS record is valid.
                      reason:
                        type: string
                        description: The reason this record is invalid.
                  dkim1:
                    type: object
                    description: A DNS record for this domain whitelabel.
                    properties:
                      valid:
                        type: boolean
                        description: Indicates if the DNS record is valid.
                      reason:
                        type: 'null'
                  dkim2:
                    type: object
                    description: A DNS record for this whitelabel.
                    properties:
                      valid:
                        type: boolean
                        description: Indicates if the DNS record is valid.
                      reason:
                        type: 'null'
                  spf:
                    type: object
                    description: The SPF record for the whitelabel.
                    properties:
                      valid:
                        type: boolean
                        description: Indicates if the SPF record is valid.
                      reason:
                        type: 'null'
          examples:
            application/json:
              id: 1
              valid: true
              validation_resuts:
                mail_cname:
                  valid: false
                  reason: Expected your MX record to be "mx.sendgrid.net" but found "example.com".
                dkim1:
                  valid: true
                  reason: null
                dkim2:
                  valid: true
                  reason: null
                spf:
                  valid: true
                  reason: null
        '500':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    message:
                      type: string
                      description: A message explaining the reason for the error.
                  required:
                    - message
          examples:
            application/json:
              errors:
                - message: internal error getting TXT
      security:
        - Authorization: []
  /whitelabel/domains/subuser:
    get:
      operationId: GET_whitelabel-domains-subuser
      summary: List the domain whitelabel associated with the given user.
      tags:
        - Whitelabel - Domains
      description: |-
        **This endpoint allows you to retrieve all of the whitelabels that have been assigned to a specific subuser.**

        A domain whitelabel allows you to remove the “via” or “sent on behalf of” message that your recipients see when they read your emails. Whitelabeling a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

        Domain whitelabels can be associated with (i.e. assigned to) subusers from a parent account. This functionality allows subusers to send mail using their parent's whitelabels. To associate a whitelabel with a subuser, the parent account must first create the whitelabel and validate it. The the parent may then associate the whitelabel via the subuser management tools.

        For more information on whitelabeling, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/index.html)

        ## URI Parameters
        | URI Parameter   | Type  | Description  |
        |---|---|---|
        | username | string  | Username of the subuser to find associated whitelabels for. |
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/whitelabel:domain_spf'
          examples:
            application/json:
              id: 1
              domain: example.com
              subdomain: mail
              username: mail@example.com
              user_id: 7
              ips: []
              custom_spf: true
              default: false
              legacy: false
              automatic_security: false
              valid: false
              dns:
                mail_server:
                  host: mail.example.com
                  type: mx
                  data: sendgrid.net
                  valid: false
                subdomain_spf:
                  host: mail.example.com
                  type: txt
                  data: 'v=spf1 ip4:192.168.1.1 ip4:192.168.0.1 -all'
                  valid: false
                domain_spf:
                  host: example.com
                  type: txt
                  data: 'v=spf1 include:mail.example.com -all'
                  valid: false
                dkim:
                  host: s1._domainkey.example.com
                  type: txt
                  data: k=rsa; t=s; p=publicKey
                  valid: false
      security:
        - Authorization: []
    delete:
      operationId: DELETE_whitelabel-domains-subuser
      summary: Disassociate a domain whitelabel from a given user.
      tags:
        - Whitelabel - Domains
      description: |-
        **This endpoint allows you to disassociate a specific whitelabel from a subuser.**

        A domain whitelabel allows you to remove the “via” or “sent on behalf of” message that your recipients see when they read your emails. Whitelabeling a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

        Domain whitelabels can be associated with (i.e. assigned to) subusers from a parent account. This functionality allows subusers to send mail using their parent's whitelabels. To associate a whitelabel with a subuser, the parent account must first create the whitelabel and validate it. The the parent may then associate the whitelabel via the subuser management tools.

        For more information on whitelabeling, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/index.html)

        ## URI Parameters
        | URI Parameter   | Type  | Required?  | Description  |
        |---|---|---|---|
        | username | string  | required  | Username for the subuser to find associated whitelabels for. |
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
      security:
        - Authorization: []
  '/whitelabel/domains/{domain_id}/subuser':
    parameters:
      - name: domain_id
        in: path
        required: true
        type: string
    post:
      operationId: POST_whitelabel-domains-domain_id-subuser
      summary: Associate a domain whitelabel with a given user.
      tags:
        - Whitelabel - Domains
      description: |-
        **This endpoint allows you to associate a specific domain whitelabel with a subuser.**

        A domain whitelabel allows you to remove the “via” or “sent on behalf of” message that your recipients see when they read your emails. Whitelabeling a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

        Domain whitelabels can be associated with (i.e. assigned to) subusers from a parent account. This functionality allows subusers to send mail using their parent's whitelabels. To associate a whitelabel with a subuser, the parent account must first create the whitelabel and validate it. The the parent may then associate the whitelabel via the subuser management tools.

        For more information on whitelabeling, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/Whitelabel/index.html)

        ## URI Parameters
        | URI Parameter   | Type   | Description  |
        |---|---|---|
        | domain_id | integer   | ID of the domain whitelabel to associate with the subuser. |
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              username:
                type: string
                description: Username to associate with the domain whitelabel.
            required:
              - username
            example:
              username: jane@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/whitelabel:domain_spf'
          examples:
            application/json:
              id: 1
              domain: example.com
              subdomain: mail
              username: mail@example.com
              user_id: 7
              ips: []
              custom_spf: true
              default: false
              legacy: false
              automatic_security: false
              valid: false
              dns:
                mail_server:
                  host: mail.example.com
                  type: mx
                  data: sendgrid.net
                  valid: false
                subdomain_spf:
                  host: mail.example.com
                  type: txt
                  data: 'v=spf1 ip4:192.168.1.1 ip4:192.168.0.1 -all'
                  valid: false
                domain_spf:
                  host: example.com
                  type: txt
                  data: 'v=spf1 include:mail.example.com -all'
                  valid: false
                dkim:
                  host: s1._domainkey.example.com
                  type: txt
                  data: k=rsa; t=s; p=publicKey
                  valid: false
      security:
        - Authorization: []
  /whitelabel/ips:
    get:
      operationId: GET_whitelabel-ips
      summary: Retrieve all IP whitelabels
      tags:
        - Whitelabel - IPs
      description: |-
        **This endpoint allows you to retrieve all of the IP whitelabels that have been createdy by this account.**

        You may include a search key by using the "ip" parameter. This enables you to perform a prefix search for a given IP segment (e.g. "192.").

        A IP whitelabel consists of a subdomain and domain that will be used to generate a reverse DNS record for a given IP. Once SendGrid has verified that the appropriate A record for the IP has been created, the appropriate reverse DNS record for the IP is generated.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/ips.html).
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: The number of results to retrieve.
          type: integer
        - name: offset
          in: query
          description: The point in the list of results to begin retrieving IPs from.
          type: integer
        - name: ip
          in: query
          description: The IP segment that you would like to use in a prefix search.
          type: string
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/ip_whitelabel'
          examples:
            application/json:
              - id: 1
                ip: 192.168.1.1
                rdns: o1.email.example.com
                users:
                  - username: john@example.com
                    user_id: 7
                  - username: jane@example.com
                    user_id: 8
                subdomain: email
                domain: example.com
                valid: true
                legacy: false
                a_record:
                  valid: true
                  type: a
                  host: o1.email.example.com
                  data: 192.168.1.1
              - id: 2
                ip: 192.168.1.2
                rdns: o2.email.example.com
                users:
                  - username: john@example.com
                    user_id: 7
                  - username: jane@example2.com
                    user_id: 9
                subdomain: email
                domain: example.com
                valid: true
                legacy: false
                a_record:
                  valid: true
                  type: a
                  host: o2.email.example.com
                  data: 192.168.1.2
      security:
        - Authorization: []
    post:
      operationId: POST_whitelabel-ips
      summary: Create an IP whitelabel
      tags:
        - Whitelabel - IPs
      description: |-
        **This endpoint allows you to create an IP whitelabel.**

        When creating an IP whitelable, you should use the same subdomain that you used when you created a domain whitelabel.

        A IP whitelabel consists of a subdomain and domain that will be used to generate a reverse DNS record for a given IP. Once SendGrid has verified that the appropriate A record for the IP has been created, the appropriate reverse DNS record for the IP is generated.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/ips.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              ip:
                type: string
                description: The IP address that you want to whitelabel.
              subdomain:
                type: string
                description: The subdomain that will be used to send emails from the IP. Should be the same as the subdomain used for your domain whitelabel.
              domain:
                type: string
                description: 'The root, or sending, domain that will be used to send message from the IP.'
            required:
              - ip
              - subdomain
              - domain
            example:
              ip: 192.168.1.1
              subdomain: email
              domain: example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/ip_whitelabel'
          examples:
            application/json:
              id: 123
              ip: 192.168.1.2
              rdns: o1.email.example.com
              users: []
              subdomain: email
              domain: example.com
              valid: true
              legacy: false
              a_record:
                valid: true
                type: a
                host: o1.email.example.com
                data: 192.168.1.2
      security:
        - Authorization: []
  '/whitelabel/ips/{id}':
    parameters:
      - name: id
        in: path
        description: The id of the IP whitelabel that you would like to retrieve.
        required: true
        type: string
    get:
      operationId: GET_whitelabel-ips-id
      summary: Retrieve an IP whitelabel
      tags:
        - Whitelabel - IPs
      description: |-
        **This endpoint allows you to retrieve an IP whitelabel.**

        A IP whitelabel consists of a subdomain and domain that will be used to generate a reverse DNS record for a given IP. Once SendGrid has verified that the appropriate A record for the IP has been created, the appropriate reverse DNS record for the IP is generated.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/ips.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/ip_whitelabel'
          examples:
            application/json:
              id: 123
              ip: 192.168.1.1
              rdns: o1.email.example.com
              users:
                - username: john@example.com
                  user_id: 7
              subdomain: email
              domain: example.com
              valid: true
              legacy: false
              a_record:
                valid: true
                type: a
                host: o1.email.example.com
                data: 192.168.1.1
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                description: The errors preventing the retrieval of the IP whitelabel.
                items:
                  type: object
                  properties:
                    message:
                      type: string
                      description: A message explaining why the IP whitelabel could not be found.
                  required:
                    - message
            required:
              - errors
          examples:
            application/json:
              errors:
                - message: Whitelabel ip not found.
      security:
        - Authorization: []
    delete:
      operationId: DELETE_whitelabel-ips-id
      summary: Delete an IP whitelabel
      tags:
        - Whitelabel - IPs
      description: |-
        **This endpoint allows you to delete an IP whitelabel.**

        A IP whitelabel consists of a subdomain and domain that will be used to generate a reverse DNS record for a given IP. Once SendGrid has verified that the appropriate A record for the IP has been created, the appropriate reverse DNS record for the IP is generated.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/ips.html).
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
        '404':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                description: The errors preventing the IP whitelabel from being deleted.
                items:
                  type: object
                  properties:
                    message:
                      type: string
                      description: A message explaining why the IP whitelabel could not be deleted.
          examples:
            application/json:
              errors:
                - message: Whitelabel ip not found.
      security:
        - Authorization: []
  '/whitelabel/ips/{id}/validate':
    parameters:
      - name: id
        in: path
        required: true
        type: integer
    post:
      operationId: POST_whitelabel-ips-id-validate
      summary: Validate an IP whitelabel
      tags:
        - Whitelabel - IPs
      description: |-
        **This endpoint allows you to validate an IP whitelabel.**

        A IP whitelabel consists of a subdomain and domain that will be used to generate a reverse DNS record for a given IP. Once SendGrid has verified that the appropriate A record for the IP has been created, the appropriate reverse DNS record for the IP is generated.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/ips.html).
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              id:
                type: integer
                description: The id of the IP whitelabel.
              valid:
                type: boolean
                description: Indicates if the IP whitelabel is valid.
                enum:
                  - true
                  - false
              validation_results:
                type: object
                description: The specific results of the validation.
                properties:
                  a_record:
                    type: object
                    properties:
                      valid:
                        type: boolean
                        description: Indicates if the IP whitelabel could be validated.
                        enum:
                          - true
                          - false
                      reason:
                        type:
                          - 'null'
                          - string
                        description: The reason the IP whitelabel could not be validated. Is null if the whitelabel was validated.
                    required:
                      - valid
                      - reason
            required:
              - id
              - valid
              - validation_results
          examples:
            application/json:
              id: 1
              valid: true
              validation_results:
                a_record:
                  valid: true
                  reason: null
        '404':
          description: Unexpected error in API call. See HTTP response body for details.
          schema:
            type: object
            properties:
              errors:
                type: array
                description: The error messages for the failed validation.
                items:
                  type: object
                  properties:
                    message:
                      type: string
                      description: A message describing why the IP could not be validated.
                  required:
                    - message
            required:
              - errors
          examples:
            application/json:
              errors:
                - message: Whitelabel ip not found.
        '500':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                description: The error messages for the failed validation.
                items:
                  type: object
                  properties:
                    message:
                      type: string
                      description: A message describing why the IP whitelabel could not be validated.
                  required:
                    - message
            required:
              - errors
          examples:
            application/json:
              errors:
                - message: internal error getting rDNS
      security:
        - Authorization: []
  /whitelabel/links:
    get:
      operationId: GET_whitelabel-links
      summary: Retrieve all link whitelabels
      tags:
        - Whitelabel - Links
      description: |-
        **This endpoint allows you to retrieve all link whitelabels.**

        Email link whitelabels allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/links.html).
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: Limits the number of results returned per page.
          type: integer
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: array
            items:
              $ref: '#/definitions/link_whitelabel'
          examples:
            application/json:
              - id: 1
                domain: example.com
                subdomain: mail
                username: john@example.com
                user_id: 7
                default: true
                valid: true
                legacy: false
                dns:
                  domain_cname:
                    valid: true
                    type: cname
                    host: mail.example.com
                    data: sendgrid.net
                  owner_cname:
                    valid: true
                    type: cname
                    host: 7.example.com
                    data: sendgrid.net
              - id: 2
                domain: example2.com
                subdomain: news
                username: john@example.com
                user_id: 8
                default: false
                valid: false
                legacy: false
                dns:
                  domain_cname:
                    valid: true
                    type: cname
                    host: news.example2.com
                    data: sendgrid.net
                  owner_cname:
                    valid: false
                    type: cname
                    host: 8.example2.com
                    data: sendgrid.net
      security:
        - Authorization: []
    post:
      operationId: POST_whitelabel-links
      summary: Create a Link Whitelabel
      tags:
        - Whitelabel - Links
      description: |-
        **This endpoint allows you to create a new link whitelabel.**

        Email link whitelabels allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/links.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: limit
          in: query
          description: Number of domains to return.
          type: integer
          default: 50
        - name: offset
          in: query
          description: Paging offset.
          type: integer
          default: 0
        - name: body
          in: body
          schema:
            type: object
            properties:
              domain:
                type: string
                description: The root domain for your subdomain that you are creating the whitelabel for. This should match your FROM email address.
              subdomain:
                type: string
                description: The subdomain to create the link whitelabel for. Must be different from the subdomain you used for a domain whitelabel.
              default:
                type: boolean
                description: 'Indicates if you want to use this link whitelabel as the fallback, or default, whitelabel.'
                enum:
                  - true
                  - false
            required:
              - domain
              - subdomain
            example:
              domain: example.com
              subdomain: mail
              default: true
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '201':
          description: ''
          schema:
            $ref: '#/definitions/link_whitelabel'
          examples:
            application/json:
              id: 1
              domain: example.com
              subdomain: mail
              username: john@example.com
              user_id: 7
              default: false
              valid: true
              legacy: false
              dns:
                domain_cname:
                  valid: true
                  type: cname
                  host: mail.example.com
                  data: sendgrid.net
                owner_cname:
                  valid: true
                  type: cname
                  host: 7.example.com
                  data: sendgrid.net
      security:
        - Authorization: []
  '/whitelabel/links/{id}':
    parameters:
      - name: id
        in: path
        description: The id of the link whitelabel you want to retrieve.
        required: true
        type: integer
    get:
      operationId: GET_whitelabel-links-id
      summary: Retrieve a Link Whitelabel
      tags:
        - Whitelabel - Links
      description: |-
        **This endpoint allows you to retrieve a specific link whitelabel.**

        Email link whitelabels allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/links.html).
      produces:
        - application/json
      parameters:
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/link_whitelabel'
          examples:
            application/json:
              id: 1
              domain: example.com
              subdomain: mail
              username: john@example.com
              user_id: 7
              default: false
              valid: true
              legacy: false
              dns:
                domain_cname:
                  valid: true
                  type: cname
                  host: mail.example.com
                  data: sendgrid.net
                owner_cname:
                  valid: true
                  type: cname
                  host: 7.example.com
                  data: sendgrid.net
      security:
        - Authorization: []
    patch:
      operationId: PATCH_whitelabel-links-id
      summary: Update a Link Whitelabel
      tags:
        - Whitelabel - Links
      description: |-
        **This endpoint allows you to update a specific link whitelabel. You can use this endpoint to change a link whitelabel's default status.**

        Email link whitelabels allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/links.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              default:
                type: boolean
                description: 'Indicates if the link whitelabel is set as the default, or fallback, whitelabel.'
                enum:
                  - true
                  - false
            example:
              default: true
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/link_whitelabel'
          examples:
            application/json:
              id: 1
              domain: example.com
              subdomain: mail
              username: john@example.com
              user_id: 7
              default: true
              valid: true
              legacy: false
              dns:
                domain_cname:
                  valid: true
                  type: cname
                  host: mail.example.com
                  data: sendgrid.net
                owner_cname:
                  valid: true
                  type: cname
                  host: 7.example.com
                  data: sendgrid.net
      security:
        - Authorization: []
    delete:
      operationId: DELETE_whitelabel-links-id
      summary: Delete a Link Whitelabel
      tags:
        - Whitelabel - Links
      description: |-
        **This endpoint allows you to delete a link whitelabel.**

        Email link whitelabels allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/links.html).
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
      security:
        - Authorization: []
  /whitelabel/links/default:
    get:
      operationId: GET_whitelabel-links-default
      summary: Retrieve a Default Link Whitelabel
      tags:
        - Whitelabel - Links
      description: |-
        **This endpoint allows you to retrieve the default link whitelabel.**

        Default link whitelabel is the actual link whitelabel to be used when sending messages. If there are multiple link whitelabels, the default is determined by the following order:
        <ul>
          <li>Validated link whitelabels marked as "default"</li>
          <li>Legacy link whitelabels (migrated from the whitelabel wizard)</li>
          <li>Default SendGrid link whitelabel (i.e. 100.ct.sendgrid.net)</li>
        </ul>

        Email link whitelabels allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/links.html).
      produces:
        - application/json
      parameters:
        - name: domain
          in: query
          description: The domain to match against when finding a corresponding link whitelabel.
          type: string
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/link_whitelabel'
          examples:
            application/json:
              id: 1
              domain: example.com
              subdomain: mail
              username: john@example.com
              user_id: 7
              default: false
              valid: true
              legacy: false
              dns:
                domain_cname:
                  valid: true
                  type: cname
                  host: mail.example.com
                  data: sendgrid.net
                owner_cname:
                  valid: true
                  type: cname
                  host: 7.example.com
                  data: sendgrid.net
      security:
        - Authorization: []
  '/whitelabel/links/{id}/validate':
    parameters:
      - name: id
        in: path
        description: The id of the link whitelabel that you want to validate.
        required: true
        type: integer
    post:
      operationId: POST_whitelabel-links-id-validate
      summary: Validate a Link Whitelabel
      tags:
        - Whitelabel - Links
      description: |-
        **This endpoint allows you to validate a link whitelabel.**

        Email link whitelabels allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/links.html).
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              id:
                type: integer
                description: The id of the link whitelabel.
              valid:
                type: boolean
                description: Indicates if the link whitelabel is valid.
                enum:
                  - true
                  - false
              validation_results:
                type: object
                description: The individual validations results for each of the DNS records associated with this link whitelabel.
                required:
                  - domain_cname
                properties:
                  domain_cname:
                    type: object
                    description: The DNS record generated for the sending domain used for this link whitelabel.
                    required:
                      - valid
                      - reason
                    properties:
                      valid:
                        type: boolean
                        description: Indicates if this DNS record is valid.
                        enum:
                          - true
                          - false
                      reason:
                        type:
                          - string
                          - 'null'
                        description: 'Null if the DNS record is valid. If the DNS record is invalid, this will explain why.'
                  owner_cname:
                    type: object
                    description: The DNS record created to verify the link whitelabel.
                    properties:
                      valid:
                        type: boolean
                        description: Indicates if the DNS record is valid.
                        enum:
                          - true
                          - false
                      reason:
                        type:
                          - 'null'
                          - string
                        description: 'Null if valid. If the DNS record is invalid, this will explain why.'
                    required:
                      - valid
                      - reason
            required:
              - id
              - valid
              - validation_results
          examples:
            application/json:
              id: 1
              valid: true
              validation_results:
                domain_cname:
                  valid: false
                  reason: Expected CNAME to match "sendgrid.net." but found "example.com.".
                owner_cname:
                  valid: true
                  reason: null
        '500':
          description: ''
          schema:
            type: object
            properties:
              errors:
                type: array
                description: The reasons why the validation failed.
                items:
                  type: object
                  properties:
                    message:
                      type: string
                      description: The reason why the link whitelabel could not be validated.
                  required:
                    - message
            required:
              - errors
          examples:
            application/json:
              errors:
                - message: internal error getting CNAME
      security:
        - Authorization: []
  /whitelabel/links/subuser:
    get:
      operationId: GET_whitelabel-links-subuser
      summary: Retrieve Associated Link Whitelabel
      tags:
        - Whitelabel - Links
      description: |-
        **This endpoint allows you to retrieve the associated link whitelabel for a subuser.**

        Link whitelables can be associated with subusers from the parent account. This functionality allows
        subusers to send mail using their parent's linke whitelabels. To associate a link whitelabel, the parent account
        must first create a whitelabel and validate it. The parent may then associate that whitelabel with a subuser via the API or the Subuser Management page in the user interface.

        Email link whitelabels allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/links.html).
      produces:
        - application/json
      parameters:
        - name: username
          in: query
          description: The username of the subuser to retrieve associated link whitelabels for.
          required: true
          type: string
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/link_whitelabel'
          examples:
            application/json:
              id: 1
              domain: example.com
              subdomain: mail
              username: john@example.com
              user_id: 7
              default: false
              valid: true
              legacy: false
              dns:
                domain_cname:
                  valid: true
                  type: cname
                  host: mail.example.com
                  data: sendgrid.net
                owner_cname:
                  valid: true
                  type: cname
                  host: 7.example.com
                  data: sendgrid.net
      security:
        - Authorization: []
    delete:
      operationId: DELETE_whitelabel-links-subuser
      summary: Disassociate a Link Whitelabel
      tags:
        - Whitelabel - Links
      description: |-
        **This endpoint allows you to disassociate a link whitelabel from a subuser.**

        Link whitelables can be associated with subusers from the parent account. This functionality allows
        subusers to send mail using their parent's linke whitelabels. To associate a link whitelabel, the parent account
        must first create a whitelabel and validate it. The parent may then associate that whitelabel with a subuser via the API or the Subuser Management page in the user interface.

        Email link whitelabels allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/links.html).
      parameters:
        - name: username
          in: query
          description: The username of the subuser account that you want to disassociate a link whitelabel from.
          required: true
          type: string
        - name: body
          in: body
          schema:
            type: 'null'
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '204':
          description: ''
          schema:
            type: object
      security:
        - Authorization: []
  '/whitelabel/links/{link_id}/subuser':
    parameters:
      - name: link_id
        in: path
        description: The id of the link whitelabel you want to associate.
        required: true
        type: integer
    post:
      operationId: POST_whitelabel-links-link_id-subuser
      summary: Associate a Link Whitelabel
      tags:
        - Whitelabel - Links
      description: |-
        **This endpoint allows you to associate a link whitelabel with a subuser account.**

        Link whitelables can be associated with subusers from the parent account. This functionality allows
        subusers to send mail using their parent's linke whitelabels. To associate a link whitelabel, the parent account
        must first create a whitelabel and validate it. The parent may then associate that whitelabel with a subuser via the API or the Subuser Management page in the user interface.

        Email link whitelabels allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

        For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Web_API_v3/Whitelabel/links.html).
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: body
          in: body
          schema:
            type: object
            properties:
              username:
                type: string
                description: The username of the subuser account that you want to associate the link whitelabel with.
            example:
              username: jane@example.com
        - $ref: '#/parameters/trait:onBehalfOfSubuser:on-behalf-of'
      responses:
        '200':
          description: ''
          schema:
            $ref: '#/definitions/link_whitelabel'
          examples:
            application/json:
              id: 1
              domain: example.com
              subdomain: mail
              username: john@example.com
              user_id: 7
              default: false
              valid: true
              legacy: false
              dns:
                domain_cname:
                  valid: true
                  type: cname
                  host: mail.example.com
                  data: sendgrid.net
                owner_cname:
                  valid: true
                  type: cname
                  host: 7.example.com
                  data: sendgrid.net
      security:
        - Authorization: []
parameters:
  'trait:authorizationHeader:Authorization':
    name: Authorization
    in: header
    required: true
    type: string
    default: Bearer <<apiKey>>
  'trait:onBehalfOfSubuser:on-behalf-of':
    name: on-behalf-of
    in: header
    type: string
    default: subuser_<user_name>
definitions:
  mail_settings_spam_check:
    title: 'Mail Settings: Spam Check'
    type: object
    properties:
      enabled:
        type: boolean
        description: Indicates if your Spam Checker mail setting is enabled.
      max_score:
        type: integer
        default: 5
        description: 'The spam threshold. Can range from 1 to 10. The lower the number, the more strict the filtering.'
        minimum: 1
        maximum: 10
      url:
        type: string
        description: The inbound parse URL where you would like the spam messages to be sent to.
    required:
      - enabled
    example:
      enabled: false
      max_score: 6
      url: 'http://example.com'
  suppression_group_unsubscribes:
    title: 'Suppressions: Suppression Group with Unsubscribes'
    allOf:
      - $ref: '#/definitions/suppression_group'
      - properties:
          unsubscribes:
            type: integer
            description: The unsubscribes associated with this group.
        required:
          - unsubscribes
    type: object
  partner_settings_new_relic:
    title: 'Partner Settings: New Relic'
    type: object
    properties:
      enable_subuser_statistics:
        type: boolean
        description: Indicates if your subuser statistics will be sent to your New Relic Dashboard.
      enabled:
        type: boolean
        description: 'Indicates if this setting is enabled. '
      license_key:
        type: string
        description: The license key provided with your New Relic account.
    required:
      - enabled
      - license_key
  subscription_tracking_settings:
    title: 'Settings: Subscription Tracking'
    type: object
    properties:
      enabled:
        type: boolean
        description: Indicates if subscription tracking is enabled.
      html_content:
        type: string
        description: 'The information and HTML for your unsubscribe link. '
      landing:
        type: string
        description: 'The HTML that will be displayed on the page that your customers will see after clicking unsubscribe, hosted on SendGrid’s server.'
      plain_content:
        type: string
        description: 'The information in plain text for your unsubscribe link. You should have the “<% %>” tag in your content, otherwise the user will have no URL for unsubscribing.'
      replace:
        type: string
        description: Your custom defined replacement tag for your templates. Use this tag to place your unsubscribe content anywhere in your emailtemplate.
      url:
        type: string
        description: The URL where you would like your users sent to unsubscribe.
  campaign_response:
    title: Campaigns Response
    allOf:
      - $ref: '#/definitions/campaign_request'
      - type: object
        properties:
          status:
            type: string
            description: The status of your campaign.
          id:
            type: integer
        required:
          - status
  contactdb_recipient_response:
    title: 'ContactDB: Recipient response'
    type: object
    properties:
      error_count:
        type: number
        default: 0
        description: The number of errors found while adding recipients.
      error_indices:
        type: array
        default: []
        description: 'The indices of the recipient(s) sent that caused the error. '
        items:
          type: number
      new_count:
        type: number
        default: 0
        description: The count of new recipients added to the contactdb.
      persisted_recipients:
        type: array
        default: []
        description: The recipient IDs of the recipients that already existed from this request.
        items:
          type: string
      updated_count:
        type: number
        default: 0
        description: The recipients who were updated from this request.
      errors:
        type: array
        items:
          type: object
          properties:
            message:
              type: string
            error_indices:
              type: array
              items:
                type: number
    required:
      - error_count
      - new_count
      - persisted_recipients
      - updated_count
    example:
      error_count: 1
      error_indices:
        - 2
      new_count: 2
      persisted_recipients:
        - YUBh
        - bWlsbGVyQG1pbGxlci50ZXN0
      updated_count: 0
      errors:
        - message: Invalid email.
          error_indices:
            - 2
  stats:
    title: Stats
    type: array
    items:
      type: object
      properties:
        date:
          type: string
          description: The date that the statistics were gathered.
        stats:
          type: array
          description: The list of statistics.
          items:
            type: object
            properties:
              type:
                type: string
                description: The type of segmentation.
              name:
                type: string
                description: The name of the specific segmentation.
              metrics:
                type: object
                description: The individual events and their statistics.
                properties:
                  blocks:
                    type: integer
                    description: The number of emails that were not allowed to be delivered by ISPs.
                  bounce_drops:
                    type: integer
                    description: The number of emails that were dropped because of a bounce.
                  bounces:
                    type: integer
                    description: The number of emails that bounced instead of being delivered.
                  clicks:
                    type: integer
                    description: The number of links that were clicked in your emails.
                  deferred:
                    type: integer
                    description: 'The number of emails that temporarily could not be delivered. '
                  delivered:
                    type: integer
                    description: The number of emails SendGrid was able to confirm were actually delivered to a recipient.
                  invalid_emails:
                    type: integer
                    description: The number of recipients who had malformed email addresses or whose mail provider reported the address as invalid.
                  opens:
                    type: integer
                    description: The total number of times your emails were opened by recipients.
                  processed:
                    type: integer
                    description: 'Requests from your website, application, or mail client via SMTP Relay or the API that SendGrid processed.'
                  requests:
                    type: integer
                    description: The number of emails that were requested to be delivered.
                  spam_report_drops:
                    type: integer
                    description: The number of emails that were dropped due to a recipient previously marking your emails as spam.
                  spam_reports:
                    type: integer
                    description: The number of recipients who marked your email as spam.
                  unique_clicks:
                    type: integer
                    description: The number of unique recipients who clicked links in your emails.
                  unique_opens:
                    type: integer
                    description: The number of unique recipients who opened your emails.
                  unsubscribe_drops:
                    type: integer
                    description: The number of emails dropped due to a recipient unsubscribing from your emails.
                  unsubscribes:
                    type: integer
                    description: The number of recipients who unsubscribed from your emails.
  contactdb_segments_conditions:
    title: 'ContactDB: Segments: Conditions'
    type: object
    properties:
      field:
        type: string
      value:
        type: string
      operator:
        type: string
        enum:
          - eq
          - ne
          - lt
          - gt
          - contains
      and_or:
        type: string
        enum:
          - and
          - or
          - ''
    required:
      - field
      - value
      - operator
  suppression_bounce:
    title: 'Suppression: Bounce'
    type: object
    properties:
      created:
        type: number
        description: The unix timestamp for when the bounce record was created at SendGrid.
      email:
        type: string
      reason:
        type: string
        description: 'The reason for the bounce. This typically will be a bounce code, an enhanced code, and a description.'
      status:
        type: string
        description: Enhanced SMTP bounce response
    example:
      created: 1250337600
      email: example@example.com
      reason: '550 5.1.1 The email account that you tried to reach does not exist. Please try double-checking the recipient''s email address for typos or unnecessary spaces. Learn more at  https://support.google.com/mail/answer/6596 o186si2389584ioe.63 - gsmtp '
      status: 5.1.1
  ip_whitelabel:
    title: Whitelabel - IPs
    type: object
    properties:
      id:
        type: integer
        description: The id of the IP whitelabel.
      ip:
        type: string
        description: The IP address that this whitelabel was created for.
      rdns:
        type: string
        description: The reverse DNS record for the IP address. This points to the IP whitelabel subdomain.
      users:
        type: array
        description: The users who are able to send mail from the IP.
        items:
          type: object
          properties:
            username:
              type: string
              description: The username of the user who can send mail from this IP.
            user_id:
              type: integer
              description: The ID of the user who can send mail from this IP.
          required:
            - username
            - user_id
      subdomain:
        type: string
        description: The subdomain created for this IP whitelabel. This is where the rDNS record points.
      domain:
        type: string
        description: 'The root, or sending, domain.'
      valid:
        type: boolean
        description: Indicates if this is a valid whitelabel.
      legacy:
        type: boolean
        description: Indicates if this whitelabel was created using the legacy whitelabel tool.
      a_record:
        type: object
        required:
          - valid
          - type
          - host
          - data
        properties:
          valid:
            type: boolean
            description: Indicates if the a_record is valid.
          type:
            type: string
            description: The type of DNS record.
          host:
            type: string
            description: This is the web address that will be mapped to the IP address.
          data:
            type: string
            description: The IP address being whitelabeled.
    required:
      - id
      - ip
      - rdns
      - users
      - subdomain
      - domain
      - valid
      - legacy
      - a_record
    example:
      id: 1
      ip: 192.168.1.1
      rdns: o1.email.example.com
      users:
        - username: john@example.com
          user_id: 7
        - username: jane@example.com
          user_id: 8
      subdomain: email
      domain: example.com
      valid: true
      legacy: false
      a_record:
        valid: true
        type: a
        host: o1.email.example.com
        data: 192.168.1.1
  contacts:
    title: Contacts
    type: object
    properties:
      address:
        type: string
      address2:
        type: object
      city:
        type: string
      company:
        type: string
      country:
        type: string
      email:
        type: string
      first_name:
        type: string
      last_name:
        type: string
      phone:
        type: string
      state:
        type: string
      zip:
        type: string
  senderID:
    title: Sender ID
    type: object
    properties:
      id:
        type: integer
        description: The unique identifier of the sender identity.
      nickname:
        type: string
        description: A nickname for the sender identity. Not used for sending.
      from:
        type: object
        properties:
          email:
            type: string
            description: This is where the email will appear to originate from for your recipient
          name:
            type: string
            description: This is the name appended to the from email field. IE - Your name or company name.
        required:
          - email
      reply_to:
        type: object
        properties:
          email:
            type: string
            description: This is the email that your recipient will reply to.
          name:
            type: string
            description: This is the name appended to the reply to email field. IE - Your name or company name.
      address:
        type: string
        description: The physical address of the sender identity.
      address_2:
        type: string
        description: Additional sender identity address information.
      city:
        type: string
        description: The city of the sender identity.
      state:
        type: string
        description: The state of the sender identity.
      zip:
        type: string
        description: The zipcode of the sender identity.
      country:
        type: string
        description: The country of the sender identity.
      verified:
        type: boolean
        description: If the sender identity is verified or not. Only verified sender identities can be used to send email.
      updated_at:
        type: integer
        description: The time the sender identity was last updated.
      created_at:
        type: integer
        description: The time the sender identity was created.
      locked:
        type: boolean
        description: 'A sender identity is locked when it is associated to a campaign in the Draft, Scheduled, or In Progress status. You cannot update or delete a locked sender identity.'
    required:
      - nickname
      - address
      - city
      - country
    example:
      id: 1
      nickname: My Sender ID
      from:
        email: from@example.com
        name: Example INC
      reply_to:
        email: replyto@example.com
        name: Example INC
      address: 123 Elm St.
      address_2: Apt. 456
      city: Denver
      state: Colorado
      zip: '80202'
      country: United States
      verified: true
      updated_at: 1449872165
      created_at: 1449872165
      locked: false
  'global:empty_request':
    title: 'Global: Request Empty Body'
    type: 'null'
  contactdb_custom_field:
    title: ContactDB Custom field schema.
    type: object
    properties:
      name:
        type: string
        description: The name of the field
      type:
        type: string
        description: The type of the field.
        enum:
          - date
          - text
          - number
    example:
      name: first_name
      type: text
  'whitelabel:domain_spf':
    title: Whitelabel - Domain
    type: object
    properties:
      id:
        type: integer
        description: The ID of the domain whitelabel.
      domain:
        type: string
        description: The domain that this whitelabel was created for.
      subdomain:
        type: string
        description: The subdomain that was used to create this whitelabel.
      username:
        type: string
        description: The username of the account that this whitelabel is associated with.
      user_id:
        type: integer
        description: The user_id of the account that this whitelabel is associated with.
      ips:
        type: array
        description: The IP addresses that are included in the SPF record for this whitelabel.
        items: {}
      custom_spf:
        type: boolean
        description: Indicates if this whitelabel uses custom SPF.
      default:
        type: boolean
        description: Indicates if this is the default whitelabel.
      legacy:
        type: boolean
        description: Indicates if this whitelabel was created using the legacy whitelabel tool.
      automatic_security:
        type: boolean
        description: Indicates if this whitelabel uses automated security.
      valid:
        type: boolean
        description: Indicates if this is a valid whitelabel.
      dns:
        type: object
        description: The DNS records for this whitelabel.
        required:
          - mail_server
          - subdomain_spf
          - domain_spf
          - dkim
        properties:
          mail_server:
            type: object
            description: Designates which mail server is responsible for accepting messages from a domain.
            required:
              - host
              - type
              - data
              - valid
            properties:
              host:
                type: string
                description: The domain sending the messages.
              type:
                type: string
                description: They type of DNS record.
              data:
                type: string
                description: The mail server responsible for accepting messages from the sending domain.
              valid:
                type: boolean
                description: Indicates if this is a valid DNS record.
          subdomain_spf:
            type: object
            description: The SPF record for the subdomain used to create this whitelabel.
            required:
              - host
              - type
              - data
              - valid
            properties:
              host:
                type: string
                description: The domain that this SPF record will be used to authenticate.
              type:
                type: string
                description: The type of data in the SPF record.
              data:
                type: string
                description: The SPF record.
              valid:
                type: boolean
                description: Indicates if this is a valid SPF record.
          domain_spf:
            type: object
            description: The SPF record for the root domain.
            required:
              - host
              - type
              - data
              - valid
            properties:
              host:
                type: string
                description: The root domain that this SPF record will be used to authenticate.
              type:
                type: string
                description: The type of data in the SPF record.
              data:
                type: string
                description: The SPF record.
              valid:
                type: boolean
                description: Indicates if the SPF record is valid.
          dkim:
            type: object
            description: The DKIM record for messages sent using this whitelabel.
            required:
              - host
              - type
              - data
              - valid
            properties:
              host:
                type: string
                description: The DNS labels for the DKIM signature.
              type:
                type: string
                description: The type of data in the DKIM record.
              data:
                type: string
                description: The DKIM record.
              valid:
                type: boolean
                description: Indicates if the DKIM record is valid.
    required:
      - id
      - domain
      - subdomain
      - username
      - user_id
      - ips
      - custom_spf
      - default
      - legacy
      - automatic_security
      - valid
      - dns
  subuser:
    title: List all Subusers for a parent response
    type: object
    properties:
      disabled:
        type: boolean
        description: Whether or not the user is enabled or disabled.
      id:
        type: number
        description: The ID of this subuser.
      username:
        type: string
        description: The name by which this subuser will be referred.
      email:
        type: string
        description: The email address to contact this subuser.
        format: email
    required:
      - disabled
      - id
      - username
      - email
    example:
      disabled: false
      email: example@example.com
      id: 1234
      username: example_subuser
  mail_settings_address_whitelabel:
    title: 'Mail Settings: Address Whitelabel'
    type: object
    properties:
      enabled:
        type: boolean
        description: 'Indicates if you have an email address whitelist enabled. '
      list:
        type: array
        description: All email address that are currently on the whitelist.
        items:
          type: string
    example:
      enabled: true
      list:
        - email1@example.com
        - example.com
  link_whitelabel:
    title: Whitelabel - Links
    type: object
    properties:
      id:
        type: integer
        description: The id of the link whitelabel.
      domain:
        type: string
        description: The root domain for this link whitelabel.
      subdomain:
        type: string
        description: The subdomain used to generate the DNS records for this link whitelabel. This subdomain must be different from the subdomain used for your domain whitelabel.
      username:
        type: string
        description: The username of the account that this link whitelabel is associated with.
      user_id:
        type: integer
        description: The id of the user that this whitelabel is associated with.
      default:
        type: boolean
        description: Indicates if this is the default link whitelabel.
        enum:
          - true
          - false
      valid:
        type: boolean
        description: Indicates if this link whitelabel is valid.
        enum:
          - true
          - false
      legacy:
        type: boolean
        description: Indicates if this link whitelabel was created using the legacy whitelabel tool.
        enum:
          - true
          - false
      dns:
        type: object
        description: The DNS records generated for this link whitelabel.
        required:
          - domain_cname
        properties:
          domain_cname:
            type: object
            description: The DNS record generated to point to your link whitelabel subdomain.
            required:
              - valid
              - type
              - host
              - data
            properties:
              valid:
                type: boolean
                description: Indicates if the DNS record is valid.
                enum:
                  - true
                  - false
              type:
                type: string
                description: The type of DNS record that was generate.
                enum:
                  - cname
                  - txt
                  - mx
              host:
                type: string
                description: The domain that this whitelabel will use when whitelabeling the links in your email.
              data:
                type: string
                description: The domain that the DNS record points to.
          owner_cname:
            type: object
            description: The DNS record generated to verify who created the link whitelabel.
            properties:
              valid:
                type: boolean
                description: Indicates if the DNS record is valid.
                enum:
                  - true
                  - false
              type:
                type: string
                description: The type of DNS record generated.
                enum:
                  - cname
                  - txt
                  - mx
              host:
                type: string
                description: Used to verify the link whitelabel. The subdomain of this domain is the user id of the user who created the link whitelabel.
              data:
                type: string
                description: The domain that the DNS record points to.
            required:
              - valid
              - host
              - data
    required:
      - id
      - domain
      - subdomain
      - username
      - user_id
      - default
      - valid
      - legacy
      - dns
  email_object:
    title: Email Object
    type: object
    properties:
      email:
        type: string
        format: email
      name:
        type: string
        description: The name of the person to whom you are sending an email.
    required:
      - email
  api_key_name_id_scopes:
    title: 'API Key Name, ID, and Scopes'
    allOf:
      - type: object
        properties:
          scopes:
            type: array
            description: The permissions this API Key has access to.
            items:
              type: string
      - $ref: '#/definitions/api_key_name_id'
    example:
      api_key_id: qfTQ6KG0QBiwWdJ0-pCLCA
      name: A New Hope
      scopes:
        - user.profile.read
        - user.profile.update
  contactdb_segments:
    title: Create a Segment request
    type: object
    properties:
      name:
        type: string
        description: The name of this segment.
      list_id:
        type: integer
        description: The list id from which to make this segment. Not including this ID will mean your segment is created from the main contactdb rather than a list.
      conditions:
        type: array
        description: The conditions for a recipient to be included in this segment.
        items:
          $ref: '#/definitions/contactdb_segments_conditions'
      recipient_count:
        type: number
        description: The count of recipients in this list. This is not included on creation of segments.
    required:
      - name
      - conditions
    example:
      name: Last Name Miller
      list_id: 4
      conditions:
        - field: last_name
          value: Miller
          operator: eq
          and_or: ''
        - field: last_clicked
          value: 01/02/2015
          operator: gt
          and_or: and
        - field: clicks.campaign_identifier
          value: '513'
          operator: eq
          and_or: or
      recipient_count: 1234
  api_key_name_id:
    title: API Key Name and ID
    type: object
    properties:
      api_key_id:
        type: string
        description: 'The ID of your API Key. '
      name:
        type: string
        description: The name of your API Key.
    example:
      api_key_id: qfTQ6KG0QBiwWdJ0-pCLCA
      name: A New Hope
  advanced_stats_opens:
    title: 'Stats: Advanced Stats with Opens'
    type: object
    properties:
      date:
        type: string
        description: The date that the events occurred.
      stats:
        type: array
        description: The statistics of the email events.
        items:
          type: object
          properties:
            type:
              type: string
              description: The type of segmentation.
            name:
              type: string
              description: The name of the specific segmentation.
            metrics:
              type: object
              description: The individual events and their stats.
              required:
                - opens
                - unique_opens
              properties:
                opens:
                  type: integer
                  description: The total number of times your emails were opened by recipients.
                unique_opens:
                  type: integer
                  description: The number of unique recipients who opened your emails.
          required:
            - type
            - name
            - metrics
    required:
      - date
      - stats
  mail_settings_template:
    title: 'Mail Settings: Template'
    type: object
    properties:
      enabled:
        type: boolean
        description: Indicates if the legacy email template setting is enabled.
      html_content:
        type: string
        description: The HTML content that you want to use for your legacy email template.
    example:
      enabled: false
      html_content: |
        <p><% body %>Example</p>
  ip_warmup_response:
    title: 'IP Warmup: IP'
    type: array
    items:
      type: object
      properties:
        ip:
          type: string
          description: The IP address.
        start_date:
          type: integer
          description: A Unix timestamp indicating when the IP address was entered into warmup mode.
      required:
        - ip
        - start_date
    example:
      - ip: 0.0.0.0
        start_date: 1409616000
  advanced_stats_mailbox_provider:
    title: 'Stats: Advanced Stats for Mailbox Provider'
    type: object
    properties:
      date:
        type: string
        description: The date that the events occurred.
      stats:
        type: array
        description: The statistics of the email events.
        items:
          type: object
          properties:
            type:
              type: string
              description: The type of segmentation.
            name:
              type: string
              description: The name of the specific segmentation.
            metrics:
              type: object
              description: The individual events and their stats.
              required:
                - clicks
                - opens
                - unique_clicks
                - unique_opens
                - blocks
                - bounces
                - deferred
                - delivered
                - drops
                - spam_reports
              properties:
                clicks:
                  type: integer
                  description: The number of links that were clicked in your emails.
                opens:
                  type: integer
                  description: The total number of times your emails were opened by recipients.
                unique_clicks:
                  type: integer
                  description: The number of unique recipients who clicked links in your emails.
                unique_opens:
                  type: integer
                  description: The number of unique recipients who opened your emails.
                blocks:
                  type: integer
                  description: The number of emails that were not allowed to be delivered by ISPs.
                bounces:
                  type: integer
                  description: The number of emails that bounced instead of being delivered.
                deferred:
                  type: integer
                  description: The number of emails that temporarily could not be delivered.
                delivered:
                  type: integer
                  description: The number of emails SendGrid was able to confirm were actually delivered to a recipient.
                drops:
                  type: integer
                  description: The number of emails that were not delivered due to the recipient email address being on a suppression list.
                spam_reports:
                  type: integer
                  description: The number of recipients who marked your email as spam.
          required:
            - type
            - name
            - metrics
    required:
      - date
      - stats
  'global:ErrorResponse':
    title: 'Global: Error Response'
    type: object
    properties:
      errors:
        type: array
        items:
          type: object
          properties:
            field:
              type:
                - string
                - 'null'
              description: The field that generated the error.
            message:
              type: string
              description: The error message.
          required:
            - message
    example:
      errors:
        - field: field_name
          message: Some message here
  contactdb_custom_field_with_id:
    title: ContactDB Custom field schema with ID.
    allOf:
      - $ref: '#/definitions/contactdb_custom_field'
      - type: object
        properties:
          id:
            type: number
            description: The ID of the custom field.
  monitor:
    title: Create monitor settings request
    type: object
    properties:
      email:
        type: string
        description: The email address to send emails at the frequency specified for monitoring.
        format: email
      frequency:
        type: number
        description: 'The frequency by which to send the emails. An email will be sent, every time your subuser sends this {frequency} emails. '
    required:
      - email
      - frequency
    example:
      email: example@example.com
      frequency: 50000
  errors:
    title: Error Schema
    type: object
    properties:
      errors:
        type: array
        items:
          type: object
          properties:
            field:
              type:
                - 'null'
                - string
              description: The field that has the error.
            message:
              type: string
              description: The message the API caller will receive.
  ip_pool:
    title: 'IP Pools: Pool'
    type: object
    properties:
      name:
        type: string
        description: The name of the IP pool.
        maxLength: 64
    required:
      - name
  google_analytics_settings:
    title: 'Settings: Google Analytics'
    type: object
    properties:
      enabled:
        type: boolean
        description: Indicates if Google Analytics is enabled.
      utm_campaign:
        type: string
        description: The name of the campaign.
      utm_content:
        type: string
        description: Used to differentiate ads
      utm_medium:
        type: string
        description: Name of the marketing medium (e.g. "Email").
      utm_source:
        type: string
        description: 'Name of the referrer source. '
      utm_term:
        type: string
        description: Any paid keywords.
    example:
      enabled: true
      utm_source: sendgrid.com
      utm_medium: email
      utm_term: ''
      utm_content: ''
      utm_campaign: website
  event_webhook_settings:
    title: 'Webhooks: Event Webhook Settings'
    type: object
    properties:
      enabled:
        type: boolean
        description: Indicates if the event webhook is enabled.
      url:
        type: string
        description: The URL that you want the event webhook to POST to.
      group_resubscribe:
        type: boolean
        description: Recipient resubscribes to specific group by updating preferences. You need to enable Subscription Tracking for getting this type of event.
      delivered:
        type: boolean
        description: Message has been successfully delivered to the receiving server.
      group_unsubscribe:
        type: boolean
        description: 'Recipient unsubscribe from specific group, by either direct link or updating preferences. You need to enable Subscription Tracking for getting this type of event.'
      spam_report:
        type: boolean
        description: Recipient marked a message as spam.
      bounce:
        type: boolean
        description: Receiving server could not or would not accept message.
      deferred:
        type: boolean
        description: Recipient's email server temporarily rejected message.
      unsubscribe:
        type: boolean
        description: Recipient clicked on message's subscription management link. You need to enable Subscription Tracking for getting this type of event.
      processed:
        type: boolean
        description: Message has been received and is ready to be delivered.
      open:
        type: boolean
        description: Recipient has opened the HTML message. You need to enable Open Tracking for getting this type of event.
      click:
        type: boolean
        description: Recipient clicked on a link within the message. You need to enable Click Tracking for getting this type of event.
      dropped:
        type: boolean
        description: 'You may see the following drop reasons: Invalid SMTPAPI header, Spam Content (if spam checker app enabled), Unsubscribed Address, Bounced Address, Spam Reporting Address, Invalid, Recipient List over Package Quota'
    required:
      - enabled
      - url
      - group_resubscribe
      - delivered
      - group_unsubscribe
      - spam_report
      - bounce
      - deferred
      - unsubscribe
      - processed
      - open
      - click
      - dropped
  user_profile:
    title: 'User: Profile'
    type: object
    properties:
      address:
        type: string
        description: The street address for this user profile.
      address2:
        type: string
        description: An optional second line for the street address of this user profile.
      city:
        type: string
        description: The city for the user profile.
      company:
        type: string
        description: That company that this user profile is associated with.
      country:
        type: string
        description: Th country of this user profile.
      first_name:
        type: string
        description: The first name of the user.
      last_name:
        type: string
        description: The last name of the user.
      phone:
        type: string
        description: The phone number for the user.
      state:
        type: string
        description: The state for this user.
      website:
        type: string
        description: The website associated with this user.
      zip:
        type: string
        description: The zip code for this user.
    example:
      address: '1451 Larimer Street, 3rd floor'
      address2: ''
      city: 'Denver, CO'
      company: SendGrid
      country: US
      first_name: Matthew
      last_name: Bernier
      phone: '7208788003'
      state: CO
      website: 'http://sendgrid.com'
      zip: '80202'
  mail_settings_footer:
    title: 'Mail Settings: Footer'
    type: object
    properties:
      enabled:
        type: boolean
        description: Indicates if the Footer mail setting is currently enabled.
      html_content:
        type: string
        description: The custom HTML content of your email footer.
      plain_content:
        type: string
        description: The plain text content of your email footer.
    example:
      enabled: true
      html_content: Example HTML content
      plain_content: Example plain content
  category_stats:
    title: 'Stats: Category Stats'
    type: object
    properties:
      date:
        type: string
        description: The date the statistics were gathered.
      stats:
        type: array
        items:
          type: object
          properties:
            metrics:
              type: object
              properties:
                blocks:
                  type: integer
                  description: The number of emails that were not allowed to be delivered by ISPs.
                bounce_drops:
                  type: integer
                  description: The number of emails that were dropped because of a bounce.
                bounces:
                  type: integer
                  description: The number of emails that bounced instead of being delivered.
                clicks:
                  type: integer
                  description: The number of links that were clicked.
                deferred:
                  type: integer
                  description: The number of emails that temporarily could not be delivered.
                delivered:
                  type: integer
                  description: The number of emails SendGrid was able to confirm were actually delivered to a recipient.
                invalid_emails:
                  type: integer
                  description: The number of recipients who had malformed email addresses or whose mail provider reported the address as invalid.
                opens:
                  type: integer
                  description: The total number of times your emails were opened by recipients.
                processed:
                  type: integer
                  description: 'Requests from your website, application, or mail client via SMTP Relay or the API that SendGrid processed.'
                requests:
                  type: integer
                  description: The number of emails that were requested to be delivered.
                spam_report_drops:
                  type: integer
                  description: The number of emails that were dropped due to a recipient previously marking your emails as spam.
                spam_reports:
                  type: integer
                  description: The number of recipients who marked your email as spam.
                unique_clicks:
                  type: integer
                  description: The number of unique recipients who clicked links in your emails.
                unique_opens:
                  type: integer
                  description: The number of unique recipients who opened your emails.
                unsubscribe_drops:
                  type: integer
                  description: The number of emails dropped due to a recipient unsubscribing from your emails.
                unsubscribes:
                  type: integer
                  description: The number of recipients who unsubscribed from your emails.
              required:
                - blocks
                - bounce_drops
                - bounces
                - clicks
                - deferred
                - delivered
                - invalid_emails
                - opens
                - processed
                - requests
                - spam_report_drops
                - spam_reports
                - unique_clicks
                - unique_opens
                - unsubscribe_drops
                - unsubscribes
            name:
              type: string
              description: The name of the category.
            type:
              type: string
              description: How you are segmenting your statistics.
          required:
            - type
    required:
      - date
    example:
      date: '2015-01-01'
      stats:
        - metrics:
            blocks: 0
            bounce_drops: 0
            bounces: 0
            clicks: 0
            deferred: 0
            delivered: 0
            invalid_emails: 0
            opens: 0
            processed: 0
            requests: 0
            spam_report_drops: 0
            spam_reports: 0
            unique_clicks: 0
            unique_opens: 0
            unsubscribe_drops: 0
            unsubscribes: 0
          name: cat1
          type: category
        - metrics:
            blocks: 0
            bounce_drops: 0
            bounces: 0
            clicks: 0
            deferred: 0
            delivered: 0
            invalid_emails: 0
            opens: 0
            processed: 0
            requests: 0
            spam_report_drops: 0
            spam_reports: 0
            unique_clicks: 0
            unique_opens: 0
            unsubscribe_drops: 0
            unsubscribes: 0
          name: cat2
          type: category
  transactional_template:
    title: 'Transactional Templates: Template'
    type: object
    properties:
      id:
        type: string
        description: The ID of the transactional template.
      name:
        type: string
        description: The name for the transactional template.
        maxLength: 100
      versions:
        type: array
        description: The different versions of this transactional template.
        items:
          $ref: '#/definitions/transactional_template_version'
    required:
      - id
      - name
  parse-setting:
    title: Parse Setting
    type: object
    properties:
      url:
        type: string
        description: The public URL where you would like SendGrid to POST the data parsed from your email. Any emails sent with the given hostname provided (whose MX records have been updated to point to SendGrid) will be parsed and POSTed to this URL.
      hostname:
        type: string
        description: 'A specific and unique domain or subdomain that you have created to use exclusively to parse your incoming email. For example, parse.yourdomain.com.'
      spam_check:
        type: boolean
        description: Indicates if you would like SendGrid to check the content parsed from your emails for spam before POSTing them to your domain.
      send_raw:
        type: boolean
        description: 'Indicates if you would like SendGrid to post the original MIME-type content of your parsed email. When this parameter is set to "false", SendGrid will send a JSON payload of the content of your email. '
    example:
      url: 'http://email.myhostname.com'
      hostname: myhostname.com
      spam_check: false
      send_raw: true
  contactdb_list:
    title: ContactDB lists
    type: object
    properties:
      id:
        type: integer
        description: The reference ID of your list.
      name:
        type: string
        description: The name of your list.
      recipient_count:
        type: integer
        description: The count of recipients currently in the list.
    required:
      - id
      - name
      - recipient_count
    example:
      id: 1
      name: listname
      recipient_count: 0
  suppression_group:
    title: 'Suppressions: Suppression Group'
    type: object
    properties:
      id:
        type: number
        description: The id of the suppression group.
      name:
        type: string
        description: The name of the suppression group. Each group created by a user must have a unique name.
        maxLength: 30
      description:
        type: string
        description: A description of the suppression group.
        maxLength: 100
      last_email_sent_at:
        type: 'null'
      is_default:
        type: boolean
        default: false
        description: Indicates if this is the default suppression group.
    required:
      - id
      - name
      - description
  mail_settings_bounce_purge:
    title: 'Mail Settings: Bounce Purge'
    type: object
    properties:
      enabled:
        type: boolean
        description: Indicates if the bounce purge mail setting is enabled.
      soft_bounces:
        type:
          - integer
          - 'null'
        description: 'The number of days, after which SendGrid will purge all contacts from your soft bounces suppression lists.'
      hard_bounces:
        type:
          - integer
          - 'null'
        description: 'The number of days, after which SendGrid will purge all contacts from your hard bounces suppression lists.'
    example:
      enabled: false
      soft_bounces: 1234
      hard_bounces: null
  transactional_template_version:
    title: 'Transactional Templates: Version'
    type: object
    properties:
      template_id:
        type: string
        description: The name of the original transactional template.
      active:
        type: integer
        description: Set the new version as the active version associated with the template. Only one version of a template can be active. The first version created for a template will automatically be set to Active.
        enum:
          - 0
          - 1
      name:
        type: string
        description: Name of the new transactional template version.
      html_content:
        type: string
        description: The HTML content of the new version. Must include <%body%> tag. Maximum of 1048576 bytes allowed for plain content.
      plain_content:
        type: string
        description: Text/plain content of the new transactional template version. Must include <%body%> tag. Maximum of 1048576 bytes allowed for plain content.
      subject:
        type: string
        description: Subject of the new transactional template version. Must include <%subject%> tag.
    required:
      - template_id
      - active
      - name
      - html_content
      - plain_content
      - subject
  mail_settings_bcc:
    title: 'Mail Settings: BCC'
    type: object
    properties:
      email:
        type: string
        description: The email address that will be sent a blind carbon copy.
      enabled:
        type: boolean
        description: Indicates if the BCC setting is enabled.
    example:
      email: example@example.com
      enabled: false
  'global:id':
    title: 'Global: ID'
    type: integer
  credentials:
    title: Credentials
    type: object
    properties:
      permissions:
        type: object
        properties:
          api:
            type: string
          mail:
            type: string
          web:
            type: string
      username:
        type: string
    example:
      address: 1234 example street
      address2: null
      city: Denver
      company: Company name
      country: US
      email: example@example.com
      first_name: Example
      last_name: User
      phone: (555) 555-5555
      state: CO
      zip: '55555'
  subuser_stats:
    title: subuser_stats
    type: object
    properties:
      date:
        type: string
        description: The date the statistics were gathered.
      stats:
        type: array
        description: The list of statistics.
        items:
          type: object
          properties:
            first_name:
              type: string
              description: The first name of the subuser.
            last_name:
              type: string
              description: The last name of the subuser.
            metrics:
              type: object
              properties:
                blocks:
                  type: integer
                  description: The number of emails that were not allowed to be delivered by ISPs.
                bounce_drops:
                  type: integer
                  description: The number of emails that were dropped because of a bounce.
                bounces:
                  type: integer
                  description: The number of emails that bounced instead of being delivered.
                clicks:
                  type: integer
                  description: The number of links that were clicked in your emails.
                deferred:
                  type: integer
                  description: The number of emails that temporarily could not be delivered.
                delivered:
                  type: integer
                  description: The number of emails SendGrid was able to confirm were actually delivered to a recipient.
                invalid_emails:
                  type: integer
                  description: The number of recipients who had malformed email addresses or whose mail provider reported the address as invalid.
                opens:
                  type: integer
                  description: The total number of times your emails were opened by recipients.
                processed:
                  type: integer
                  description: 'Requests from your website, application, or mail client via SMTP Relay or the API that SendGrid processed.'
                requests:
                  type: integer
                  description: The number of emails that were requested to be delivered.
                spam_report_drops:
                  type: integer
                  description: The number of emails that were dropped due to a recipient previously marking your emails as spam.
                spam_reports:
                  type: integer
                  description: The number of recipients who marked your email as spam.
                unique_clicks:
                  type: integer
                  description: The number of unique recipients who clicked links in your emails.
                unique_opens:
                  type: integer
                  description: The number of unique recipients who opened your emails.
                unsubscribe_drops:
                  type: integer
                  description: The number of emails dropped due to a recipient unsubscribing from your emails.
                unsubscribes:
                  type: integer
                  description: The number of recipients who unsubscribed from your emails.
            name:
              type: string
              description: The username of the subuser.
            type:
              type: string
              description: The type of account.
  campaign_request:
    title: Campaigns Request
    type: object
    properties:
      title:
        type: string
        description: The display title of your campaign. This will be viewable by you in the Marketing Campaigns UI.
      subject:
        type:
          - string
          - 'null'
        description: The subject of your campaign that your recipients will see.
      sender_id:
        type:
          - 'null'
          - integer
        description: The ID of the "sender" identity that you have created. Your recipients will see this as the "from" on your marketing emails.
      list_ids:
        type:
          - array
          - 'null'
        description: The IDs of the lists you are sending this campaign to. You can have both segment IDs and list IDs
        items:
          type: integer
      segment_ids:
        type:
          - array
          - 'null'
        description: The segment IDs that you are sending this list to. You can have both segment IDs and list IDs.
        items:
          type: integer
      categories:
        type:
          - array
          - 'null'
        description: The categories you would like associated to this campaign.
        items:
          type: string
      suppression_group_id:
        type:
          - 'null'
          - integer
        description: 'The suppression group that this marketing email belongs to, allowing recipients to opt-out of emails of this type.'
      custom_unsubscribe_url:
        type:
          - string
          - 'null'
        description: This is the url of the custom unsubscribe page that you provide for customers to unsubscribe from your suppression groups.
      ip_pool:
        type:
          - string
          - 'null'
        description: The pool of IPs that you would like to send this email from.
      html_content:
        type:
          - string
          - 'null'
        description: The HTML of your marketing email.
      plain_content:
        type:
          - string
          - 'null'
        description: The plain text content of your emails.
    required:
      - title
    example:
      id: 986724
      title: May Newsletter
      subject: New Products for Summer!
      sender_id: 124451
      list_ids:
        - 110
        - 124
      segment_ids:
        - 110
      categories:
        - summer line
      suppression_group_id: 42
      custom_unsubscribe_url: ''
      ip_pool: marketing
      html_content: <html><head><title></title></head><body><p>Check out our summer line!</p></body></html>
      plain_content: Check out our summer line!
      status: Draft
  user_scheduled_send_status:
    title: 'User: Scheduled Send status'
    allOf:
      - $ref: '#/definitions/mail_batch_id'
      - type: object
        description: The status of the scheduled send.
        properties:
          status:
            type: string
            description: The status of the scheduled send.
            enum:
              - cancel
              - pause
        required:
          - status
  mail_settings_forward_spam:
    title: 'Mail Settings: Forward Spam'
    type: object
    properties:
      email:
        type: string
        description: The email address where you would like the spam reports to be forwarded.
      enabled:
        type: boolean
        description: Indicates if the Forward Spam setting is enabled.
    example:
      email: ''
      enabled: true
  contactdb_segments_with_id:
    title: 'ContactDB:: Segments with ID'
    allOf:
      - type: object
        properties:
          id:
            type: number
            description: The ID of the segment.
        required:
          - id
      - $ref: '#/definitions/contactdb_segments'
  advanced_stats_country:
    title: 'Stats: Advanced Stats with Clicks and Opens'
    type: object
    properties:
      date:
        type: string
        description: The date that the events occurred.
      stats:
        type: array
        description: The statistics of the email events.
        items:
          type: object
          properties:
            type:
              type: string
              description: The type of segmentation.
            name:
              type: string
              description: The name of the specific segmentation.
            metrics:
              type: object
              description: The individual events and their stats.
              required:
                - clicks
                - opens
                - unique_clicks
                - unique_opens
              properties:
                clicks:
                  type: integer
                  description: The number of links that were clicked in your emails.
                opens:
                  type: integer
                  description: The total number of times your emails were opened by recipients.
                unique_clicks:
                  type: integer
                  description: The number of unique recipients who clicked links in your emails.
                unique_opens:
                  type: integer
                  description: The number of unique recipients who opened your emails.
          required:
            - type
            - name
            - metrics
    required:
      - date
      - stats
  advanced_stats_clicks:
    title: 'Stats: Advanced Stats with Clicks'
    type: object
    properties:
      date:
        type: string
        description: The date that the events occurred.
      stats:
        type: array
        description: The statistics of the email events.
        items:
          type: object
          properties:
            type:
              type: string
              description: The type of segmentation.
            name:
              type: string
              description: The name of the specific segmentation.
            metrics:
              type: object
              description: The individual events and their stats.
              required:
                - clicks
                - unique_clicks
              properties:
                clicks:
                  type: integer
                  description: The number of links that were clicked in your emails.
                unique_clicks:
                  type: integer
                  description: The number of unique recipients who clicked links in your emails.
          required:
            - type
            - name
            - metrics
    required:
      - date
      - stats
  contactdb_recipient:
    title: 'ContactDB: Recipient'
    type: object
    properties:
      recipients:
        type: array
        items:
          type: object
          properties:
            id:
              type: string
              description: The ID of this recipient.
            created_at:
              type: number
              description: 'The time this record was created in your contactdb, in unixtime.'
            custom_fields:
              type: array
              description: The custom fields assigned to this recipient and their values.
              items:
                $ref: '#/definitions/contactdb_custom_field_with_id_value'
            email:
              type: string
              description: The email address of this recipient. This is a default custom field that SendGrid provides.
              format: email
            first_name:
              type:
                - string
                - 'null'
              description: The first name of this recipient. This is a default custom field that SendGrid provides.
            last_name:
              type:
                - string
                - 'null'
              description: The last name of the recipient.
            last_clicked:
              type:
                - number
                - 'null'
              description: 'The last time this recipient clicked a link from one of your campaigns, in unixtime.'
            last_emailed:
              type:
                - number
                - 'null'
              description: 'The last time this user was emailed by one of your campaigns, in unixtime.'
            last_opened:
              type:
                - number
                - 'null'
              description: 'The last time this recipient opened an email from you, in unixtime.'
            updated_at:
              type: number
              description: The last update date for this recipient's record.
          required:
            - email
  mail_settings_patch:
    title: 'Mail Settings: Patch'
    type: object
    properties:
      enabled:
        type: boolean
        description: Indicates if the mail setting is enabled.
      email:
        type: string
        description: The email address of the recipient.
    example:
      enabled: true
      email: email@example.com
  mail_settings_forward_bounce:
    title: 'Mail Settings: Forward Bounce'
    type: object
    properties:
      email:
        type:
          - string
          - 'null'
        description: The email address that you would like your bounce reports forwarded to.
      enabled:
        type: boolean
        description: Indicates if the bounce forwarding mail setting is enabled.
    example:
      enabled: false
      email: null
  contactdb_custom_field_with_id_value:
    title: ContactDB Custom field schema.
    allOf:
      - $ref: '#/definitions/contactdb_custom_field_with_id'
      - type: object
        properties:
          value:
            type:
              - string
              - 'null'
            description: The value of this recipient's custom field
  contactdb_recipient_count:
    title: 'ContactDB: Recipient Count'
    type: object
    properties:
      recipient_count:
        type: number
        description: The count of recipients.
    required:
      - recipient_count
    example:
      recipient_count: 1234
  subuser_post:
    title: 'Subuser::POST'
    type: object
    properties:
      username:
        type: string
        description: The username of the subuser.
      user_id:
        type: number
        description: The user ID for this subuser.
      email:
        type: string
        description: The email address for this subuser.
        format: email
      signup_session_token:
        type: string
      authorization_token:
        type: string
      credit_allocation:
        type: object
        properties:
          type:
            type: string
    required:
      - username
      - user_id
      - email
    example:
      username: example_subuser
      user_id: 1234
      email: example@example.com
      signup_session_token: ''
      authorization_token: ''
      credit_allocation:
        type: unlimited
  'whitelabel::domain':
    title: Whitelabel - Domain
    type: object
    properties:
      id:
        type: number
        description: The ID of the domain whitelabel.
      user_id:
        type: number
        description: The ID of the user that this whitelabel will be associated with.
      subdomain:
        type: string
        description: The subdomain to use for this domain whitelabel.
      domain:
        type: string
        description: The domain that this whitelabel is being created for.
      username:
        type: string
        description: The username that this whitelabel will be associated with.
      ips:
        type: array
        description: The IPs to be included in the custom SPF record for this domain whitelabel.
        items:
          type: object
      custom_spf:
        type: boolean
        description: Indicates whether this domain whitelabel will use custom SPF.
      default:
        type: boolean
        description: Indicates if this domain whitelabel is the default whitelabel.
      legacy:
        type: boolean
        description: Indicates if this domain whitelabel was created using the legacy whitelabel tool.
      automatic_security:
        type: boolean
        description: Indicates if this domain whitelabel uses automated security.
      valid:
        type: boolean
        description: Indicates if this is a valid whitelabel.
      dns:
        type: object
        description: The DNS records for this whitelabel that are used to authenticate the sending domain.
        required:
          - mail_cname
          - dkim1
          - dkim2
        properties:
          mail_cname:
            type: object
            description: The CNAME for your sending domain that points to sendgrid.net.
            required:
              - valid
              - type
              - host
              - data
            properties:
              valid:
                type: boolean
                description: Indicates if this is a valid CNAME.
              type:
                type: string
                description: The type of DNS record.
              host:
                type: string
                description: The domain that this CNAME is created for.
                format: hostname
              data:
                type: string
                description: The CNAME record.
          dkim1:
            type: object
            description: A DNS record.
            required:
              - valid
              - type
              - host
              - data
            properties:
              valid:
                type: boolean
                description: Indicates if this is a valid DNS record.
              type:
                type: string
                description: The type of DNS record.
              host:
                type: string
                description: The domain that this DNS record was created for.
              data:
                type: string
                description: The DNS record.
          dkim2:
            type: object
            description: A DNS record.
            required:
              - valid
              - type
              - host
              - data
            properties:
              valid:
                type: boolean
                description: Indicates if this is a valid DNS record.
              type:
                type: string
                description: The type of DNS record.
              host:
                type: string
                description: The domain that this DNS record was created for.
              data:
                type: string
                description: The DNS record.
    required:
      - id
      - user_id
      - subdomain
      - domain
      - username
      - ips
      - custom_spf
      - default
      - legacy
      - automatic_security
      - valid
      - dns
  mail_batch_id:
    title: 'Mail: Batch ID'
    type: object
    properties:
      batch_id:
        type: string
        pattern: '^[a-zA-Z0-9\-\_]'
    required:
      - batch_id
    example:
      batch_id: HkJ5yLYULb7Rj8GKSx7u025ouWVlMgAi`;
