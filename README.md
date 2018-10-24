# jquery-basic-form-generator
Form generator

It's a very basic implementation of a plugin that ables you to build forms programatically using a JSON.

Clone this repository and open the ```index.html``` to checkout how it properly works.

An example of a very basic usage.
```javascript
$("#container").formgenerator({
    structure: {
        name: "text",
        companyId: "number",
        properties: {
            boardId: "number",
            description: "text",
            creationDate: "date"
        }
    },
    structureOptions: {
        companyId: {
            disable: true,
            placeholder: "Not visible"
        }
    },
    data: {}
})
```
To get data filled:
```javascript
$("#container").formgenerator("getData")
```
This can be usefull as an academic resource or just for study purposes
