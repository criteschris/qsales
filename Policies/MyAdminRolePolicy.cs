using Microsoft.AspNetCore.Authorization;

namespace qsales.Policies {
    public static class MyAdminRolePolicy {
        public static string Name => "MyAdminRole";

        public static void Build(AuthorizationPolicyBuilder builder) => builder.RequireClaim("groups", "a4c7246c-c129-470c-b4cb-03a56d2863c7");
    }
}