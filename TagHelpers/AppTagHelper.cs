using System.IO;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace qsales.AppTagHelper {
public class AppTagHelper : TagHelper {
public object ReduxInitialState { get; set; }
        public string ContainerElementId { get; set; }
        public string WindowVarName { get; set; }

        private string ConvertToJson(object state)
        {
            using (var stringWriter = new StringWriter())
            {
                using (var jsonWriter = new JsonTextWriter(stringWriter))
                {
                    var serializer = new JsonSerializer
                    {
                        ContractResolver = new CamelCasePropertyNamesContractResolver(),
                        StringEscapeHandling = StringEscapeHandling.EscapeNonAscii
                    };

                    jsonWriter.QuoteName = false;
                    serializer.Serialize(jsonWriter, state);

                    return stringWriter.ToString();
                }
            }
        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.SuppressOutput();
            output.Content.SetHtmlContent("<script>window." + (WindowVarName ?? "initialState") + " = " + ConvertToJson(ReduxInitialState) + ";</script><div id='" + ContainerElementId + "'></div>");
        }
}
}