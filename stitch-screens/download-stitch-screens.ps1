# Download Stitch project 1418745328101826450 - screens (images + HTML)
# Run: .\download-stitch-screens.ps1
# Uses curl.exe -L to follow redirects; --ssl-no-revoke for Windows cert issues

$ErrorActionPreference = "Stop"
$Base = $PSScriptRoot
$Curl = "curl.exe"
$CurlArgs = @("-L", "--ssl-no-revoke", "-s", "-S")

$Screens = @(
    @{
        Dir = "01-property-search-map-view"
        Title = "Property Search & Map View"
        Screenshot = "https://lh3.googleusercontent.com/aida/AOfcidXYK0GaiDq7n5Wj-051CpBtQ91Cl5R_Ut9o_bWIOKmqZkzKbnK5Lhawn2jC1Jckpxqb25KQ_GDPiaWXHmEQm_Lq50IKJjDKaBvwIIQ9JldmUEsSedE5FXebd1Fr_2Qgu5Da2URo2Do16QGH_MUlISbqft9Y9ZcKq3AxLqZ03aLNT_6cgQyY6fdRN8H6H5I-xSfuQ4fhNyf0obK7NF_uXHk0YhftfOhl-tV9FOORMuFSGrSZYz3caxIXpQ"
        Html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2NiNjRhNjNlNmVhZDRkMTZiZWQwMTEyNDE4NmI2MDE3EgsSBxDmtsv67h8YAZIBIwoKcHJvamVjdF9pZBIVQhMxNDE4NzQ1MzI4MTAxODI2NDUw&filename=&opi=89354086"
    },
    @{
        Dir = "02-agent-crm-dashboard"
        Title = "Agent CRM Dashboard"
        Screenshot = "https://lh3.googleusercontent.com/aida/AOfcidXvAe5SSIFeAbFBIQ-PkF54KRcgEpxVBBFqDSNmtShlVk9_2lHtqqJcTD0O5Ir0XXR2HQr0YZh_oyuMnnF0xQ2JSD5cGBEypJDCWtCA3VMyY3zYNDiSdyd37LqTzS__m9-mVeaGZsufAoaDqiLd7GNyrJQBWnYTVQyh1qvpqbn4SEQhIinhr7cszQf2SFHZ8oJW_yJha5xxawHnnwu3QY0rX95DUr5mgRZNApk59356VRyRFf0nTSmqjA"
        Html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQyYTFjMzMyNzBiNjQ0YWVhYzEzMzYwNDIxYmRjZmEyEgsSBxDmtsv67h8YAZIBIwoKcHJvamVjdF9pZBIVQhMxNDE4NzQ1MzI4MTAxODI2NDUw&filename=&opi=89354086"
    },
    @{
        Dir = "03-lead-management-kanban-c69eeb5b"
        Title = "Lead Management Kanban Board"
        Screenshot = "https://lh3.googleusercontent.com/aida/AOfcidV4H_SbxXIancrFwin29awMESqKx6pC1kT4p2MIEtQq07QqSy0Mwx3Juo-VEM1D7J7z-7SBvG2fZRrd5-KtwqyvCa-tk4Zfv8VJSDaYNPE-luT75ZeO7B5dlg2QnpIXavuNRgn7HJ_PMlvv65Tu_MwuQ-Nw6HzVCFEaH_fF54QygahWPLLJ56SrQdrbhBIRMogSAwBZbFpyPkT8wzzOJD7m05u-ZtbOvH0JRmQJh468lDPYoVOFFbPbmvM"
        Html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2IzOGVjMDI2NTVmMjRjMTRhOTdjOTc0YmNhYjM5ZDVmEgsSBxDmtsv67h8YAZIBIwoKcHJvamVjdF9pZBIVQhMxNDE4NzQ1MzI4MTAxODI2NDUw&filename=&opi=89354086"
    },
    @{
        Dir = "04-lead-management-kanban-0843a5ec"
        Title = "Lead Management Kanban Board"
        Screenshot = "https://lh3.googleusercontent.com/aida/AOfcidVUMmkqHLzXoJVKQYGmdtHJSehcmtDyu6aC8xfUdZo-a6hHIPjIC1Y1-JusZ__0OurpKFb8k3TPtBnHno39tn_Mb8fIobIuv4SIzXT5ZFHzlPlIOcqoPSJ_xn6Y6KrwFzhbcyJtUm5F7iDU6LGg70g9MDHdtJMx8-NoZipQX3Eug7IN--3eFhABZz5m477ie6CxMYpu96oe58yQpc7dOpdPySL4ys0ncgF5OO2HUvgA9K2oEwKG7InrTko"
        Html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzcyN2NmMTY3Mjg3ZjQzNGM4NTVlZjU4N2E0YmMxMWRhEgsSBxDmtsv67h8YAZIBIwoKcHJvamVjdF9pZBIVQhMxNDE4NzQ1MzI4MTAxODI2NDUw&filename=&opi=89354086"
    },
    @{
        Dir = "05-lead-management-kanban-71eddfc5"
        Title = "Lead Management Kanban Board"
        Screenshot = "https://lh3.googleusercontent.com/aida/AOfcidUx6jhBn4HBZoAwcu4LSqr6geVPyX5S_WrN_zvnZCjBAUAxeZsyOQOWMG9ZUHcuqNCikd_rP39ghEEFcEU5ParOlJdINgcAb-DOBIZHQvojI0JJsYQjFM1EvJwqPDmgo2m02071StI-zhY5M-0zSXNH7YPlxiwhmAVCUnIpHIR0pIpZOFT8mg1N2GhmHvac7ncJc7UHfbfPSV7bQ0TbEu4jJ6NQq6fwgH4TIT-4iD6l1KxHXlJyesgLXx8"
        Html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzY3NTU0MDk2NmUwMTQ4ZjRiZDI4MDUwODE1ZTY0NzIzEgsSBxDmtsv67h8YAZIBIwoKcHJvamVjdF9pZBIVQhMxNDE4NzQ1MzI4MTAxODI2NDUw&filename=&opi=89354086"
    },
    @{
        Dir = "06-add-property-features-step4"
        Title = "Add Property: Features & Details (Step 4)"
        Screenshot = "https://lh3.googleusercontent.com/aida/AOfcidUL8wwAirelLe5EetcQCn_L0z9dA2vvtSSefln0vE5f7JZUsEo_hWjmMzyGamKlikOc2cDjFjwMkus0QtPhvcnU6XdX41TQl4x6WcdvOIkILys7sAauSVsqPJoXuhdctNbmiV7SYn8WUj8Hopaf36jl0TlqTzVP5WSgU9DfgYzfQugCBttpbkJwagZT_IfoM8C8vrJFVmZt_UNHWL4Q_eNuW-1O10mZqKOFTvSZm_2e8OvQkn0Z_KGULRs"
        Html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdkOWQzMTM5ODI3YjQ2OTdiNDlhMjIzMzQ3NTg5MTBjEgsSBxDmtsv67h8YAZIBIwoKcHJvamVjdF9pZBIVQhMxNDE4NzQ1MzI4MTAxODI2NDUw&filename=&opi=89354086"
    },
    @{
        Dir = "07-property-listing-success-preview"
        Title = "Property Listing Success & Preview"
        Screenshot = "https://lh3.googleusercontent.com/aida/AOfcidXRQqkzjj6VaPpM-hwC0NUolGQmR-jc2IJY3ynppccxKH7o26DzjvNV9tdnVBvdvLd_-LdFWBBYFPjUBQjrl8CSx0nLwdJZRRSjRlDs2hJEzECXszwvV2oVCxi56DCMb1CY8tJaxUZimSXG8ZqFk3NCT5Jq2KNYfqsbcln2EfkF5OIxKFkhbSvAtGE5Cy6ifEIw7GSYIXI8ramiMOQULmfGCyhh4tyqWAaBQJUHFwg90162SngQFABb3QM"
        Html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2NiMmUzNzk3Y2Q3ZjRjMTg4NjlmYjY3ODRkZjRlZTE4EgsSBxDmtsv67h8YAZIBIwoKcHJvamVjdF9pZBIVQhMxNDE4NzQ1MzI4MTAxODI2NDUw&filename=&opi=89354086"
    },
    @{
        Dir = "08-imocv-marketplace-homepage-b1d484f5"
        Title = "imo.cv Marketplace Homepage"
        Screenshot = "https://lh3.googleusercontent.com/aida/AOfcidUHl4qlRb0UR_KXBsZXvSJD8htYF2XdOWY5yar3XN_DlYld4OKfhk4-wV8TrgD0ykH1jVm_qc5cyga5ECAHkR22Z6_8dMpgaONqKCxr1JlXA-rl63a6PAVKOh4mA0Hx0_2DlS13gIL7RjsULrPXyUYVlwWBM7JtJMfLz5_AV2mYhV_qTaLbUaeqpyHBKX8tHenFJchxQgEsV_G2vVwC2b6t0ZD4mLNBa5aFdGQitHK2TkPDPP1iUrDQ9Rk"
        Html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdmYzE1OGVjNmVmNjRiZTU4NzQxMDk3MGNhOGY0OGFmEgsSBxDmtsv67h8YAZIBIwoKcHJvamVjdF9pZBIVQhMxNDE4NzQ1MzI4MTAxODI2NDUw&filename=&opi=89354086"
    },
    @{
        Dir = "09-imocv-marketplace-homepage-885879b8"
        Title = "imo.cv Marketplace Homepage"
        Screenshot = "https://lh3.googleusercontent.com/aida/AOfcidW6oXg-BBkWMM5di_UrwoEVb8C_0A-k7Rjg1wExc6tYxnnszfEMru6HhAoSUah5vk9a-3gc1RJRFZA9BGcN3gDQG-9DEa35oelLMPjkKfp81LohyIEufqTGJyJSs_gbgUdqV5wxFkipeNsPzu96Sg0uunvHENh2Jo6SxDG8pTI8Nas373rQdblZWhleWL8uNZdnA1xexsRW8IYhnP9pPVgfaMc15--3dQ8gyxMy6PuqDqMGvh7JmzOqoA"
        Html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzhjOGQ2NjZlZWYzMDQ2MDFhZTQ3YmQ2NDJmNzVhMzE0EgsSBxDmtsv67h8YAZIBIwoKcHJvamVjdF9pZBIVQhMxNDE4NzQ1MzI4MTAxODI2NDUw&filename=&opi=89354086"
    },
    @{
        Dir = "10-imocv-marketplace-homepage-564bc0c3"
        Title = "imo.cv Marketplace Homepage"
        Screenshot = "https://lh3.googleusercontent.com/aida/AOfcidU7egvNSwgohGqHnX5cjkrqQqx1uemKGTqOwXPzax0ncHarGnL3cb93_qHGqpl87Dm_RAqMbiJ_mOUKpeAOEs2rIgpcNRA0C_ggHllqIpY1yn9M46TH2aXchBFuFoLFuZn1fqqaBpLRuQglR5GPHCzpKTujQS4HlGILAp9C9wkhTSoSo--D9D6VUFdnrmbFKWQvXfd7wJlc8KfdkisqTQy4vSK-UiwCIbCsmw-BXAlnu-Oa4THwTzjiXx0"
        Html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzUyOTcwOWZkMDU0YjRmNzE5OGUwOGU5Yjc5N2QwNzgxEgsSBxDmtsv67h8YAZIBIwoKcHJvamVjdF9pZBIVQhMxNDE4NzQ1MzI4MTAxODI2NDUw&filename=&opi=89354086"
    },
    @{
        Dir = "11-imocv-marketplace-homepage-08be7e38"
        Title = "imo.cv Marketplace Homepage"
        Screenshot = "https://lh3.googleusercontent.com/aida/AOfcidWWs73xjxQVO-6KilYwVP-D_GeraKruEh5fvNm8PvLrCawk6eF8l_tu61LpfZFF0T_XBqHorikQ-iLqclbXGcQe3eiC_zam7R3Z5PwOeV8TdOLQsyJzpftZa-i3BRtAPFTJ1Uz7H76nL5QhrZfAvBG4C0YqFuC8BeTJQ-Me3hzzxOz-GPeZDam5hncmiaS8siWJgeOhuY4v_Hd0gl-L1oHtHRQD5aUQF37GKLkREv0J54yMFDlm96L_D8o"
        Html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzIzODkwYjM2NjVlNjQ0YWM4NWUxMTM3MDQ0NDJkNDAyEgsSBxDmtsv67h8YAZIBIwoKcHJvamVjdF9pZBIVQhMxNDE4NzQ1MzI4MTAxODI2NDUw&filename=&opi=89354086"
    }
)

foreach ($s in $Screens) {
    $dirPath = Join-Path $Base $s.Dir
    if (-not (Test-Path $dirPath)) { New-Item -ItemType Directory -Path $dirPath -Force | Out-Null }
    $imgPath = Join-Path $dirPath "screenshot.png"
    $htmlPath = Join-Path $dirPath "index.html"
    Write-Host "Downloading: $($s.Title) -> $($s.Dir)"
    & $Curl $CurlArgs -o $imgPath $s.Screenshot
    & $Curl $CurlArgs -o $htmlPath $s.Html
}

Write-Host "Done. All 11 screens saved under $Base"
