# orsay
## cli utils for [`mdx-deck`][mdx] based showcases

These utilities are designed to simplify the creation and especially the publishing of [`mdx-deck`][mdx] based galleries. Slides are defined as `.mdx` files in the directory in addition to `index.mdx`, which should provide an overview of the slides. Slides and files stored in `./assets` are published successively in the `./public` directory, which can be delivered using [`serve-handler`][servehandler].

The name is based on the Musée d'Orsay - mdo - a famous gallery.

## Installation
For installation use the [Node Package Manager][npm]:
```
$ npm i -g orsay
```

## CLI
#### `orsay publish [name] [-f|--force]`
Publish all `<slide>.mdx` files in the root directory to `./public/<slide>/`.  
Except for `index.mdx` which gets published to `./public/`.  
Additionally, `./assets/` gets cloned to `./public/assets/`.

- `name`  
Optional file in the root directory which should be published exclusively.   
Files with and without `.mdx` extension are allowed.  
If enabled the script behaves like with an enabled `-f` flag.

- `-f|--force`  
Optional flag to enable the force mode.  
The force mode re-publishes even already published slides.

#### `orsay hide [name]`
Unpublish all files related to `<slide>.mdx` from `./public/`.

- `name`  
File in the root directory which should be unpublished exclusively.   
Files with and without `.mdx` extension are allowed.  

#### `orsay dev <name>`
Run a specific slide in the root directory in development mode.  
The view gets updated automatically and runs at `:8080`.


#### `orsay serve [-c|--config] [-m|--merge]`
Saves the default `serve` configs in root directory. 
Redirects `./public/:id/card.png` to `./:id/card.png` as well as `./public/:id/` to `./:id/`.

- `-c|--config`  
Optional flag to pass relative path of additional config file.  

- `-m|--merge`  
Optional flag to deepmerge the custom with the default configs.  
Otherwise it gets replaced.


## Contribution
Fork this repository and push in your ideas.

Do not forget to add corresponding tests to keep up 100% test coverage.

[npm]: https://github.com/npm/npm
[mdx]: https://github.com/jxnblk/mdx-deck
[servehandler]: https://github.com/zeit/serve-handler
