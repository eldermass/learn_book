// ! 断言
// nullcheck   --strictNullChecks

function broken(name: string | null): string {
    function postfix(epithet: string) {
        return name!.charAt(0) + ". the " + epithet
    }
    name = name || "Bob"
    return postfix(name)
}
