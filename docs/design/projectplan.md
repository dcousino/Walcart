# Project Management Plan For Walcart
---
### WCPMP-1 {style=text-align:center}

#### 11/4/18

#### Team Name: Bits Please

Team Member 1: Daniel Cousino

Team Member 2: Mohammed Allibalogun

Team Member 3: Gezahegn Sete

GitHub: <https://github.com/dcousino/Walcart>

## Table of Contents


[SECTION 1. OVERVIEW 1](#section-1.-overview)

[1.1 Project Summary 1](#project-summary)

[1.1.1 Purpose, Scope, and Objectives 1](#purpose-scope-and-objectives)

[1.1.2 Assumptions and Constraints 2](#assumptions-and-constraints)

[1.1.3 Project Deliverables 2](#project-deliverables)

[SECTION 2. REFERENCES 3](#section-2.-references)

[2.1 Standards and Documents 3](#standards-and-documents)

[SECTION 3. DEFINITIONS 4](#section-3.-definitions)

[SECTION 4. PROJECT ORGANIZATION 5](#section-4.-project-organization)

[4.1 External Interfaces 5](#external-interfaces)

[4.2 Internal Structure 5](#internal-structure)

[4.3 Project Roles and Responsibilities 5](#project-roles-and-responsibilities)

[SECTION 5. MANAGEment PROCESS 7](#section-5.-management-process)

[5.1 Start-up 7](#start-up)

[5.1.1 Estimation 7](#estimation)

[5.1.2 Staffing 7](#staffing)

[5.1.3 Resource Acquisition 7](#resource-acquisition)

[5.1.4 Staff Training 7](#staff-training)

[5.2 Work Planning 7](#work-planning)

[SECTION 6. TECHNICAL PROCESS 11](#section-6.-technical-process)

List of Figures



SECTION 1. OVERVIEW
===================

1.1 Project Summary 
--------------------

### 1.1.1 Purpose, Scope, and Objectives 

-   The purpose project is to have a web application that makes use of the
    Walmart API to allow for online shopping and same day local delivery
    service. The client side will be an Angular 7 application. The backend will
    be serverless, provided by Amazon Web Services (AWS). Lambda functions will
    be written in Node.js. The application will allow for users to register and
    securely login to their accounts. They will be able to build a shopping
    list, create an order, checkout, schedule a delivery, cancel a delivery,
    view previous orders, and delete their account. There will be a stretch goal
    of integrating with a payment provider like Stripe and automated deployment
    to the platform we decide on.

-   Basic requirements:

    -   User friendly client application that provides a better shopping
        experience (Angular)

    -   Client should be able to call both our API as well as Walmart API via a
        proxy (to protect the API key)

    -   A secure site that protects user data (AWS Cognito)

    -   An API that facilitate the secure querying of data related to customers,
        shopping carts, and orders, to include historical orders. (AWS API
        Gateway and Lambda functions)

    -   A database to persist customer data (AWS DynamoDB)

![workflow](http://www.plantuml.com/plantuml/png/TPLBIyD04CVlWNo7fITxwDcR6DDGX69Aso0YHRRDMiKyIXw8IB-xiplxc4qYFUNttvt_x3peVTlnfklB8Wp2uC9FN_mis2mkFaNLpTXl631s4rNdlk0Dkvsp1NjzviK9hXp2u0fg69oAki_nv6lql4CkVoZe672hX5iilOYAHPl7kQJwQ5NdWgrvUSnvgqw_DxmKR2Mwh1MD0t4ZU2Tybbto4LkAGWmP18l1VnZCPnZCPnZCPn0iRV9nQWE8uGOGusdedZ-3ch0L7F_cFpF6MraZ_Sb8JNfuL8i0ohrAzWTvDjibszqRV6c-INTKa9z6oJmXCtoPh9DzGYG4KhqwzrfcFRPFjyj__BKoaO1HfZBGscGASlJ66SJHTZ-P00eJ_bgOiaTfqdt3sxRxQEh-_65pY9vU3lgOQYVqd1zv2vt-gNXPBnze_pBJlq7Wr5Ps8CJclTGY3EmMiiNYpkmTpMuX-TJMgRFgbfimHm6Rj3sejpCCxAWXjplg9Wq5kgjss52YAqk7JTkJvRLjjMQuXwwhrCpJV3CgZSrGTLDitVIMaYccVWFLT_J5iQVMzPDKFrIheIGsOqhT4obr-LEgcwAG6ZWJT4XTaoXr7Q3Kb4Cn75SJTin9WJnEtkvn-RiNLGx_Gty0 "workflow")



-   Functional Requirements

    -   User can create an account with email as user name and a password that
        conforms to best security practices

    -   User and only specified user can login to their account with email and
        password

    -   User can view and update profile

    -   User can delete account

    -   User can logout

    -   User can browse and search for Walmart products

    -   User can create, view, update, and delete a shopping cart

    -   User can create, view, update, and delete a shopping order

    -   User can create, view, update, and delete a scheduled delivery

    -   User can view past orders

    -   User can checkout (using dummy payment method)

### 1.1.2 Assumptions and Constraints 

For the Walcart project it is assumed that we should have all the AWS resources we need using our free tier as well as the credits provided by our educational accounts. We should have continued access to Walmart public API. A major constraint that not all team members have experience with the technology stack.

### 1.1.3 Project Deliverables

Project deliverable for the Walcart project will be:

1.  A web application built on the Angular framework that integrates with a
    serverless backend that provides a means to:

    1.  Securely register and login

    2.  Communicate with a back end via HTTPS

    3.  Browse and search Walmart product

    4.  View, create, update, and delete a shopping cart

    5.  Schedule a delivery

    6.  View, create, update, and delete orders (including historical)

2.  User guide and manual

    1.  This will be provided in the form of a markdown document hosted on
        GitHub.

SECTION 2. REFERENCES
=====================

2.1 Standards and Documents
---------------------------

The standards and documents listed below are referenced in this document:

1.  Project Plan (using a Sample Project Plan and a Sample Requirement
    Specification).

2.  Project Design (following the Software Design Description outlines).

3.  Test Plan

4.  Phase 1, 2, and 3 Sources (will be used to keep track of the application
    evolution and performance).

5.  Final outline

SECTION 3. DEFINITIONS
======================

For this application, we’ll be using the Agile methodology. Agile will allow our
team to follow a set of values and principles through iteration when developing
this application. Prompting for constant deliverable application for our client
to test, welcoming changes to better improve the application, and constant
engagement from the team member will ensure a successful development of the
Walcart application.

SECTION 4. PROJECT ORGANIZATION 
================================

4.1 External Interfaces
-----------------------

The project will rely on the Walmart Open API,
<https://developer.walmartlabs.com/docs>. Daniel Cousino has already created a
developer account, requested and received a API key. There is a limit of 5 calls
per second and 5,000 calls per day, which should be more than sufficient for the
scope of this project.

4.2 Internal Structure 
-----------------------

In the Walcart development team, each team member will be responsible for
developing a full feature themselves, to include testing. This should minimize
roadblocks that would potentially be create by waiting on other team member to
complete task that others are dependent upon. Each team member will have a
collateral duty, they are as follows:

-   Program Manager

-   User Experience Specialist

-   Test and Deployment Plan Specialist

The team with utilize Git for source control, with the repository hosted in
GitHub. There will be 2 branches: master and development. Once true development
begins, team members with only check in to feature branches and then create pull
request to merge into development. Merges into development will require at least
one other team member to code review and approve. Pull requests into master will
require both other team members to review and approve. All unit test must be run
before a pull request into development. All integration tests must be run before
completing a pull request into master. The master branch should be completely
stable and deployable. For the client development, the team will make use of
TSLint, any changes to the linter configuration must be agreed on by all members
of the team. Testing of the client will utilize the Karma test runner. AWS
features will be either tested using built in test tools in the management
console or passively when testing frontend features.

4.3 Project Roles and Responsibilities 
---------------------------------------

As covered in the previous section, each team member will be responsible for
developing full features, to include testing. For example, a developer might
have a story “As a user, I want to be able to add items to my cart.” The
developer will have to create a PUT or POST method on the “/cart” resource in
API gateway and create the lambda function that inserts the new item in to the
database. Then, in the client they will create the method to call the previously
created HTTP method and any container or presentational components need to
display the result. In addition, each team member will have a collateral duty:

-   Program Manager/Lead developer

    -   Provides oversight, creates epics and features requirements—with
        feedback and input from the rest of the team of course. Guide the team
        in creating user stories and tasks.

    -   Preform the more complicated task surrounding authentication and state
        management.

    -   Responsible for overall design and architecture.

-   User Experience Specialist

    -   Create mockups and dictate over look and feel of the frontend
        application

-   Test and Deployment Plan Specialist

    -   Ensure adequate code coverage.

    -   Creates and maintains the test plan.

    -   Manages the deployment of the static website to S3 and deploys all
        backend services from the development stage to production

SECTION 5. MANAGEment PROCESS 
==============================

5.1 Start-up 
-------------

.

### 5.1.1 Estimation 

There should be no monetary cost associated with this project. All AWS resources
should be covered by free tier resources and education credits. The Walmart API
is public. The entire project will take no longer than 8 weeks with a target
completion date of December 16th, 2018.

### 5.1.2 Staffing 

Staffing has already been completed.

### 5.1.3 Resource Acquisition 

Using free tier AWS accounts provisioned in previous recourse. A Walmart API key
has already been acquired.

### 5.1.4 Staff Training

Team members have been watching videos to get up to speed with Angular and
Node.js.

5.2 Work Planning 
------------------

| Milestone Description              | Category  | Assigned To                | Progress | Start      | Points |
| ---------------------------------- | --------- | -------------------------- | -------- | ---------- | ------ |
| **Form Groups/Project idea**       | Milestone |                            |          |            | 5      |
| Initial Research                   | Task      | All                        | 100%     | 10/20/2018 |        |
| Come up with project idea          | Task      | All                        | 100%     | 10/21/2018 |        |
| Meet                               | Task      | All                        | 100%     | 10/21/2018 |        |
| **Project Plan**                   | Story     |                            |          |            | 8      |
| Summary                            | Task      | Daniel                     | 100%     | 11/1/2018  |        |
| Project Organization               | Task      | Daniel                     | 100%     | 11/2/2018  |        |
| Management Process                 | Task      | Daniel                     | 100%     | 11/3/2018  |        |
| References                         | Task      | Mohammed                   |          | 11/1/2018  |        |
| Technical Process                  | Task      | Mohammed                   |          | 11/2/2018  |        |
| Definitions                        | Task      | Mohammed                   |          | 11/3/2018  |        |
| **Design**                         | Story     |                            |          | 11/5/2018  | 8      |
| Develop Test Plan                  | Task      | Gezahegn                   |          | 11/5/2018  |        |
| Document Test Plan                 | Task      | Mohammed                   |          | 11/8/2018  |        |
| Create Design Document             | Task      | Daniel                     |          | 11/5/2018  |        |
| Agree on final design              | Task      | All                        |          | 11/5/2018  |        |
| Create User Guide                  | Story     | Gezahegn, Mohammed         |          | 11/10/2018 | 3      |
| **Develop Backend**                | Epic      |                            |          | 11/12/2018 |        |
| Create Cart Flow                   | Feature   | Gezahegn                   |          | 11/12/2018 |        |
| Create Cart Model                  | Story     | Gezahegn                   |          | 11/12/2018 | 1      |
| Create Cart Table                  | Story     | Gezahegn                   |          | 11/13/2018 | 1      |
| Create Cart Lambda Functions       | Story     | Gezahegn                   |          | 11/14/2018 | 5      |
| Create Cart HTTP Methods           | Story     | Gezahegn                   |          | 11/16/2018 | 3      |
| Create User Flow                   | Feature   | Daniel                     |          | 11/12/2018 |        |
| Create User Model                  | Story     | Daniel                     |          | 11/12/2018 | 1      |
| Create User Table                  | Story     | Daniel                     |          | 11/13/2018 | 1      |
| Create User Lambda Functions       | Story     | Daniel                     |          | 11/14/2018 | 5      |
| Create User HTTP Methods           | Story     | Daniel                     |          | 11/16/2018 | 3      |
| Create Orders Flow                 | Feature   | Mohammed                   |          | 11/12/2018 |        |
| Create Orders Model                | Story     | Mohammed                   |          | 11/12/2018 | 1      |
| Create Orders Table                | Story     | Mohammed                   |          | 11/13/2018 | 1      |
| Create Orders Lambda Functions     | Story     | Mohammed                   |          | 11/14/2018 | 5      |
| Create Orders HTTP Methods         | Story     | Mohammed                   |          | 11/16/2018 | 3      |
| Create Cognito User Pool           | Story     | Daniel                     |          | 11/19/2018 | 2      |
| Create Passthrough for Walmart API | Story     | Daniel                     |          | 11/16/2018 | 1      |
| **Develop Client**                 | Epic      |                            |          | 11/26/2018 |        |
| Authentication                     | Feature   | Daniel                     |          | 11/26/2018 |        |
| Login                              | Story     | Daniel                     |          | 11/26/2018 | 3      |
| Registration                       | Story     | Daniel                     |          | 11/29/2018 | 3      |
| Products Page                      | Story     | Mohammed, Daniel, Gezahegn |          | 11/29/2018 | 3      |
| Cart View                          | Story     | Gezahegn                   |          | 11/29/2018 | 3      |
| Implement NgRx Store               | Story     | Daniel                     |          | 11/26/2018 | 5      |
| Order View                         | Story     | Mohammed                   |          | 11/26/2018 | 5      |
| User Profile                       | Story     | Daniel                     |          | 11/30/2018 | 3      |
| **Test and Deployment**            | Feature   |                            |          | 12/3/2018  |        |
| Integration Tests                  | Story     | Mohammed, Daniel, Gezahegn |          | TBD        | 8      |
| Client Deployment                  | Story     | Mohammed                   |          | TBD        | 3      |
| Server Deployment                  | Story     | Daniel, Gezahegn           |          | TBD        | 5      |

SECTION 6. TECHNICAL PROCESS 
=============================

In this segment we’ll share an outline on how our team will plan, develop,
construct, and test the Walcart code.

**6.1 Process Model**

As mentioned in prior segments, our development team will utilize the agile
project management model to construct our application. We’ll begin by breaking
down the project into small parts and will be built by our developer based on
priority levels. Consistent communication and feedback between the customer and
the developer is necessary for the development of the Walcart application,
henceforth numerous iteration code we’ll be shared between one another for
feedback. The agile methodology promotes the idea of constants chance and
adaptation through the Lifecycle of the application. We’ve began by creating a
database and tables that will be used to store

**6.2 Methods, Tools, and Techniques**

While following the Agile methodology, the Walcart development team will utilize
the below tools, techniques, and features throughout the SDLC of the web
application:

1.  Language – JavaScript and associated Libraries

2.  Database Implementations – DynamoDB and NoSQL

3.  Source Code Repository – Git and GitHub

4.  Documentation – Microsoft word 2016

5.  Testing – Visual Studio

6.  Build and Deploy – AWS services (API Gateway, Lambda)

We’ve created a repository in GitHub named 495WegemansApp were we’ll store all
our source codes. Any update, correction, deletion that will prompt to execute a
commit command will require detail comment explaining the reason behind those
actions.
