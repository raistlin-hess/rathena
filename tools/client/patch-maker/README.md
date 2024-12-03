# Creating client patches
Client patches are created and served via [rpatchur](https://github.com/L1nkZ/rpatchur).
1. Test all changes in your client locally
1. Edit the following your `patch.yml` ([example file](./examples/patch.yml))
    - `target_grf_name` - Typically should be `hessro.grf`.
    - `entries`
        - To add new files, set `relative_path` to the file/directory to add
        - To remove files, update `relative_path` and also define `is_removed: true`
1. Run `mkpatch` with the following arguments to create a single patch file:
    ```powershell
    # -p indicates root path containing all files to reference in `.\patch.yml`
    # -o indicates the name of the final patch file that will be added to the server
    PS C:\> .\mkpatch.exe -p .\HessRO\data\ -o 2025-01-01.patch .\patch.yml
    ```
1. On the patch server, add an entry for each of your patches to the bottom of the `plist.txt` file, where patches are applied in ascending order. The format of each line is `<patch-number> <patch-file-name>` (single space between <patch-number> and <patch-file-name>).
    ```ini
    # These are existing patches
    1 2024-12-01.patch
    2 2024-12-02.patch
    # This is our new patch
    3 2025-01-01.patch
    ```
1. Upload the patch file to the patch server
