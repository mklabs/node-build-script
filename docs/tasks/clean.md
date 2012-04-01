# Task - clean

The clean task will remove and wipe out any previous build dirs (which
are `staging` and `output` config value).

## Helpers

### rimraf

`rimraf` is the helper wrapper for
[rimraf](https://github.com/isaacs/rimraf#readme) package. The given
`cb` callback if passed in will make the call asynchronous, otherwise
`rimraf.sync` is used.

    task.helper('rimraf', dir, cb);

