# WristBand
## API Documentation

WristBand is made up of two entities, users and posts.

They have a one-to-many relationship, one user can have many posts.

Users include a profile picture data point that has it's own GET and POST requests and is an image entity with a one-to-one relationship with their respective user entities.

<hr>
<br>

# Contents

## Posts

[GET /posts](#posts1)

[GET /posts/tags](#posts2)

[GET /posts/:user](#posts3)

[GET /posts/:user/:tag](#posts4)

[POST /posts/:user/new](#posts5)


## User

[GET /user](#users1)

[GET /user/ids](#users2)

[GET /user/:id](#users3)

[GET /user/:id/profile-pic](#users4)

[POST /user/:id/profile-pic/new](#users5)

[POST /user/new](#users6)

[POST /user/:id/edit](#users7)

<br>
<hr>
<br>


# Posts

# <a name="posts1"> GET /posts </a>

Returns all of posts from all of the profiles in a json data structure.

## Response field
| Name      | Type          | Description     |
|-          |-              |-              |
| postsList      | json       | list of post json Objects  |
<hr>

# <a name="posts2"> GET /posts/tags </a>

Returns every tag throughout all of the post entities, no repeats for repeating tags.

## Response field
| Name      | Type          | Description     |
|-          |-              |-              |
| tagsList      | json       | set of all of the tags present, searches every post |
<hr>

# <a name="posts3"> GET /posts/:user </a>

Returns a json data structure holding all of the posts associated with a specified user.

## Path parameter
| Name      | Type          | Description     |
|-          |-              |-              |
| user      | integer       | unique userId associated with the user for which all of the posts are to be fetched  |
## Response field
| Name      | Type          | Description     |
|-          |-              |-              |
| postsList      | json       | json list of all posts associated with a specific user |
<hr>


# <a name="posts4"> GET /posts/:user/:tag </a>

Returns a json data structure holding all of the posts associated with a specified user that include a specified tag. Used to narrow down the scope of the posts that are shown on the page via a search bar in the main website.

## Path parameter
| Name      | Type          | Description     |
|-          |-              |-              |
| user      | integer       | Unique userId associated with the user for which all of the posts are to be fetched  |
| tag | string | The tag that will be searched within all posts by the specified user |

## Response fields
| Name      | Type          | Description     |
|-          |-              |-              |
| postsList      | json       | json list of all posts associated with a specific user which have the tag specified by the tag parameter |
<hr>

# <a name="posts5"> POST /posts/:user/new </a>

Creates a new post that becomes associated with the specified user. This new post takes on the values assigned to it via a form input.

## Path parameters
| Name      | Type          | Description     |
|-          |-              |-              |
| user      | integer       | unique userId associated with the user that will have a new post POSTed to  |

## Form Input fields
| Name      | Type          | Description     |
|-          |-              |-              |
| song-name      | string       | The title of the song for the song post |
| song-author      | string       | The author of the song  |
| song-musician      | string       | The musician who played the song at the live event the post is about |
| song-date      | string       | The date that the user saw the song performed live |
| song-link      | string       | A link to the song on YouTube so that the post can link to the song |
| song-instrument      | string       | The instrument used to perform the song (eg. Live Band, Piano, Voice) |

<hr>
<br>

# User

# <a name="users1"> GET /user </a>

Returns a json data structure with the username, biography and profile picture src for every user in the json data structure.

## Response fields
| Name      | Type          | Description     |
|-          |-              |-              |
| profilesList      | json       | json list of json Objects that hold the profile data for every user |
<hr>

# <a name="users2"> GET /user/ids </a>

Returns the integer values of all of the user ids that are currently in use by the json data strucutre.

## Response fields
| Name      | Type          | Description     |
|-          |-              |-              |
| UserIds      | list       | List of all userIds currently in use |
<hr>

# <a name="users3"> GET /user/:id </a>

Returns the profile data for a specified user.

## Path parameters
| Name      | Type          | Description     |
|-          |-              |-              |
| id      | integer       | The unique userId that identifies which user's profile is to be fetched |
## Response fields
| Name      | Type          | Description     |
|-          |-              |-              |
| username      | string       | Username of the user |
| biography      | string       | Biography of the user |
| profile-pic      | string       | src for the location that the profile picture of the user is stored |
<hr>


# <a name="users3"> GET /user/:id/profile-pic </a>

Returns the image file for the profile picture associated with the user specified.

## Path parameters
| Name      | Type          | Description     |
|-          |-              |-              |
| id      | integer       | The unique userId that identifies which user's profile picture is to be fetched |
## Response fields
| Name      | Type          | Description     |
|-          |-              |-              |
| profilePicture      | image       | Profile picture associated with the user parameter |
<hr>


# <a name="users4"> POST /user/:id/profile-pic/upload </a>

Uploads an inputted image to the server and then links this image to the user specified so that it becomes that profile's profile picture.

## Path parameters
| Name      | Type          | Description     |
|-          |-              |-              |
| id      | integer       | The unique userId that identifies which user's should be associated with the uploaded profile picture|

## Form Input fields
| Name      | Type          | Description     |
|-          |-              |-              |
| profilePicture      | image       | Image to be uploaded to the server and related to the user specified by the user |

<hr>

# <a name="users5"> POST /user/new </a>

Creates a new user with the following data structure:

```
{ username: 'Username', biography: 'Biography', 'profile-pic': '/assets/profile-pictures/blank.png' }
```

This blank profile can then be edited using the POST /user/:id/edit request so that new and original data can be associated with it.

<hr>


# <a name="users6"> POST /user/:id/edit </a>

Updates the 

## Path parameters
| Name      | Type          | Description     |
|-          |-              |-              |
| id      | integer       | The unique userId that identifies which user's profile is to be edited |
## Form Input fields
| Name      | Type          | Description     |
|-          |-              |-              |
| username      | string       | new Username for the specified user |
| biography      | string       | new Biography for the specified user |
<hr>